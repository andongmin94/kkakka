package org.ssafy.ssafy_common2.dogam.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.handler.TransactionHandler;
import org.ssafy.ssafy_common2._common.redis.RedisLockRepository;
import org.ssafy.ssafy_common2._common.service.S3Uploader;
import org.ssafy.ssafy_common2.dogam.dto.reqeust.DogamCreateRequestDto;
import org.ssafy.ssafy_common2.dogam.dto.response.*;
import org.ssafy.ssafy_common2.dogam.entity.CommentDogam;
import org.ssafy.ssafy_common2.dogam.entity.DislikeDogam;
import org.ssafy.ssafy_common2.dogam.entity.Dogam;
import org.ssafy.ssafy_common2.dogam.repository.CommentDogamRepository;
import org.ssafy.ssafy_common2.dogam.repository.DislikeDogamRepository;
import org.ssafy.ssafy_common2.dogam.repository.DogamRepository;
import org.ssafy.ssafy_common2.itemshop.dto.request.EnforcementCreateRequestDto;
import org.ssafy.ssafy_common2.itemshop.dto.response.EnforcementCreateResponseDto;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.itemshop.entity.ItemShop;
import org.ssafy.ssafy_common2.itemshop.repository.ItemShopRepository;
import org.ssafy.ssafy_common2.notification.dto.NotificationDto;
import org.ssafy.ssafy_common2.notification.entity.NotificationType;
import org.ssafy.ssafy_common2.notification.service.NotificationService;
import org.ssafy.ssafy_common2.user.entity.Alias;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.FriendList;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.AliasRepository;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;
import org.ssafy.ssafy_common2.user.repository.FriendListRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DogamService {

    private static final int DOGAM_DELETE_POINT = 1000;

    private final S3Uploader s3Uploader;
    private final DogamRepository dogamRepository;
    private final UserRepository userRepository;
    private final DynamicUserInfoRepository dynamicUserInfoRepository;
    private final ItemShopRepository itemShopRepository;
    private final FriendListRepository friendListRepository;
    private final AliasRepository aliasRepository;
    private final DislikeDogamRepository dislikeDogamRepository;
    private final CommentDogamRepository commentDogamRepository;

    private final NotificationService notificationService;
    private final RedisLockRepository redisLockRepository;
    private final TransactionHandler transactionHandler;

    public DogamCreateResponseDto createDogam(DogamCreateRequestDto dto, Long friendId, User sender) {

        String key = friendId + " " + sender.getId();

        return redisLockRepository.runOnLock(
                key,
                () -> transactionHandler.runOnWriteTransaction(
                        () -> createDogamLogic(dto, friendId, sender)));
    }

    // 도감 만들기
    public DogamCreateResponseDto createDogamLogic(DogamCreateRequestDto dto, Long friendId, User sender) {

        if (userRepository.findByIdAndDeletedAtIsNull(sender.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        // 포인트 차감 로직 시작
        DynamicUserInfo userInfo = dynamicUserInfoRepository.findByIdAndDeletedAtIsNull(sender.getId()).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_SENDER)
        );

        if (userInfo.getPoint() < 10) {
            throw new CustomException(ErrorType.NOT_ENOUGH_POINT);
        }
        userInfo.minusPoint(10);
        // 포인트 차감 로직 끝

        User receiver = userRepository.findByIdAndDeletedAtIsNull(friendId).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_RECEIVER)
        );

        ItemShop itemShop = itemShopRepository.findByItemNameAndDeletedAtIsNull("도감추가").orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_ITEM_SHOP)
        );

        ItemDealList itemDealList = ItemDealList.of(sender, itemShop);

        // imgURL을 만들어서 S3에 저장 시작
        String imgUrl = "";
        System.out.println(dto.getImgUrl());
        if (dto.getImgUrl() == null) {
            imgUrl = "https://ssafys3.s3.ap-northeast-2.amazonaws.com/static/%EC%9D%B4%EC%A6%88%EB%A6%AC%EC%96%BC.jpg";
        } else {
            try {
                imgUrl = s3Uploader.upload(dto.getImgUrl());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        // imgURL을 만들어서 S3에 저장 끝

        Dogam dogam = Dogam.of(dto.getDogamTitle(), imgUrl, receiver);

        // 연관관계 편의 매서드 사용
        dogam.addItemDealList(itemDealList);
        itemDealList.setDogam(dogam);

        dogamRepository.save(dogam);

        // 새 도감 알림
        notifyNewDogam(sender, receiver, dogam.getId());

        DogamCreateResponseDto responseDto = DogamCreateResponseDto.of(imgUrl, dto.getDogamTitle());
        return responseDto;
    }

    @Transactional
    public Map<String, Integer> deleteDogam(Long dogamId, User user) {

        Dogam dogam = dogamRepository.findByIdAndDeletedAtIsNull(dogamId).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_DOGAM)
        );

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        if (!Objects.equals(dogam.getUser().getId(), user.getId())) {
            throw new CustomException(ErrorType.NOT_MATCHING_DOGAM_USER);
        }

        dogamRepository.delete(dogam);

        user.getUserInfoId().minusPoint(DOGAM_DELETE_POINT);
        userRepository.saveAndFlush(user);

        Map<String, Integer> ans = new HashMap<>();
        ans.put("UserPoint : ", user.getUserInfoId().getPoint());
        return ans;
    }

    // 메인 페이지 도감 리스트 불러오기 메서드
    public PaginationResponse<DogamMainListResponseDto> getDogamListWithPagination(User user, int page, int size) {
        // 유저 정보가 있는지 확인
        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        // 유저의 친구 목록 조회
        List<FriendList> friendLists = friendListRepository.findAllBySenderAndIsCheckAndDeletedAtIsNull(user, true);
        List<Dogam> dogamList = new ArrayList<>();

        // 친구의 도감 목록 조회
        for (FriendList f : friendLists) {
            if (Objects.equals(f.getReceiver().getId(), user.getId())) {
                dogamList.addAll(dogamRepository.findAllByUserIdAndDeletedAtIsNull(f.getSender().getId()));
            } else {
                dogamList.addAll(dogamRepository.findAllByUserIdAndDeletedAtIsNull(f.getReceiver().getId()));
            }
        }

        // 도감 리스트를 최신순으로 정렬
        dogamList.sort(Comparator.comparing(Dogam::getCreatedAt).reversed());

        // 전체 아이템 수
        long totalItems = dogamList.size();

        // 전체 페이지 수
        int totalPages = (int) Math.ceil((double) totalItems / size);

        // 현재 페이지가 범위를 벗어나면 기본값 설정
        if (page < 0) {
            page = 0;
        } else if (page >= totalPages) {
            page = totalPages - 1;
        }

        // 페이지 인덱스 계산
        int startIndex = page * size;
        int endIndex = Math.min(startIndex + size, (int) totalItems);

        List<DogamMainListResponseDto> responseDtoList = new ArrayList<>();

        // 데이터 가져오기
        for (int i = startIndex; i < endIndex; i++) {
            Dogam d = dogamList.get(i);

            // 최신 칭호 조회
            Alias alias = aliasRepository.findFirstByUserIdAndDeletedAtIsNullOrderByCreatedAtDesc(d.getUser().getId()).orElse(null);
            String alias1 = d.getUser().getUserInfoId().getCurAlias();
            if (!Objects.equals(alias1, alias != null ? alias.getAliasName() : null)) {
                throw new CustomException(ErrorType.NOT_FOUND_ALIAS);
            }

            // 최신 댓글 조회
            CommentDogam commentDogam = commentDogamRepository.findFirstByDogamIdAndDeletedAtIsNullOrderByCreatedAtDesc(d.getId());
            int commentNum = commentDogamRepository.countByDogamIdAndDeletedAtIsNull(d.getId());

            User commentUser = null;
            if (commentDogam != null) {
                commentUser = userRepository.findByKakaoEmailAndDeletedAtIsNull(commentDogam.getUserEmail()).orElseThrow(
                        () -> new CustomException(ErrorType.NOT_FOUND_USER)
                );
            }
            boolean isHated = false;
            DislikeDogam dislikeDogam = dislikeDogamRepository.findByUserEmailAndDogamIdAndDeletedAtIsNull(user.getKakaoEmail(), d.getId()).orElse(null);
            if (dislikeDogam != null && dislikeDogam.isDislike()) {
                isHated = true;
            }

            DogamCommentResponseDto dogamCommentResponseDto = DogamCommentResponseDto.of(
                    commentDogam != null ? commentDogam.getId() : null,
                    commentUser != null ? commentUser.getId() : null,
                    commentUser != null ? commentUser.getKakaoProfileImg() : null,
                    commentDogam != null ? commentDogam.getDogamComment() : null,
                    commentUser != null ? commentUser.getUserName() : null,
                    commentUser != null ? commentUser.getKakaoEmail() : null,
                    commentUser != null ? commentUser.getCreatedAt() : null);

            int dislikeNum = dislikeDogamRepository.countByDogamIdAndIsDislikeTrueAndDeletedAtIsNull(d.getId());
            responseDtoList.add(DogamMainListResponseDto.of(d.getUser().getId(), d.getDogamTitle(), d.getId(), d.getUser().getUserName(), d.getUser().getKakaoEmail(), alias != null ? alias.getAliasName() : null, d.getDogamImage(), d.getUser().getKakaoProfileImg(),
                    dislikeNum, isHated, commentNum, dogamCommentResponseDto));
        }

        return new PaginationResponse<>(responseDtoList, page, totalPages, totalItems);
    }


    public DogamDetailResponseDto dogamDetail(Long dogamId, User user) {

        Dogam dogam = dogamRepository.findByIdAndDeletedAtIsNull(dogamId).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_DOGAM)
        );

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        DynamicUserInfo dynamicUserInfo = dynamicUserInfoRepository.findByIdAndDeletedAtIsNull(dogam.getUser().getId()).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_USER)
        );

        List<CommentDogam> commentDogamList = commentDogamRepository.findAllByDogamIdAndDeletedAtIsNull(dogamId);
        List<DogamCommentResponseDto> dogamCommentResponseDtos = new ArrayList<>();

        for (CommentDogam cd : commentDogamList) {
            User commentUser = userRepository.findByKakaoEmailAndDeletedAtIsNull(cd.getUserEmail()).orElseThrow(
                    () -> new CustomException(ErrorType.NOT_FOUND_USER)
            );
            dogamCommentResponseDtos.add(DogamCommentResponseDto.of(cd.getId(), commentUser.getId(), commentUser.getKakaoProfileImg(), cd.getDogamComment(),
                    commentUser.getUserName(), commentUser.getKakaoEmail(), cd.getCreatedAt()));
        }

        // 싫어요 숫자
        int hatedNum = dislikeDogamRepository.countByDogamIdAndIsDislikeTrueAndDeletedAtIsNull(dogam.getId());

        // 내가 싫어요 했는지 여부
        boolean isHated = false;
        DislikeDogam dislikeDogam = dislikeDogamRepository.findByUserEmailAndDogamIdAndDeletedAtIsNull(user.getKakaoEmail(), dogamId).orElse(null);

        if (dislikeDogam != null  && dislikeDogam.isDislike()) {
            isHated = true;
        }

        DogamDetailResponseDto dto = DogamDetailResponseDto.of(dogam.getUser().getId(), dogam.getUser().getKakaoProfileImg(), dogam.getDogamImage()
                , dogam.getDogamTitle(), hatedNum, isHated, dogam.getUser().getUserName(), dogam.getUser().getKakaoEmail()
                , dogam.getCreatedAt(), dynamicUserInfo.getCurAlias() == null || dynamicUserInfo.getCurAlias().isEmpty() ? "칭호가 없습니다." : dynamicUserInfo.getCurAlias()
                , dogamCommentResponseDtos);
        return dto;
    }

    // 새 도감 알림
    private void notifyNewDogam(User sender, User receiver, Long dogamId) {

        notificationService.send(
                NotificationDto.of(
                        receiver,
                        NotificationType.NEW_DOGAM,
                        "새로운 도감이 등록되었습니다.",
                        receiver.getKakaoProfileImg(),
                        sender.getKakaoEmail(),
                        dogamId
                )
        );
    }

    // 프로필 도감 리스트
    public PaginationResponse<DogamProfileListResponseDto> dogamProfileList(Long userId, User user, int page, int size) {
        // 유저 정보가 있는지 확인
        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        // 해당 유저의 도감 목록 조회
        List<Dogam> dogamList = dogamRepository.findAllByUserIdAndDeletedAtIsNull(userId);

        // 페이지 인덱스 계산
        int startIndex = page * size;
        int endIndex = Math.min(startIndex + size, dogamList.size());

        // 도감 리스트를 최신순으로 정렬
        dogamList.sort(Comparator.comparing(Dogam::getCreatedAt).reversed());

        List<DogamProfileListResponseDto> dtoList = new ArrayList<>();

        // 데이터 가져오기
        for (int i = startIndex; i < endIndex; i++) {
            Dogam d = dogamList.get(i);
            int dislikeDogamNum = dislikeDogamRepository.countByDogamIdAndIsDislikeTrueAndDeletedAtIsNull(d.getId());
            DislikeDogam userDislike = dislikeDogamRepository.findByUserEmailAndDogamIdAndDeletedAtIsNull(user.getKakaoEmail(), d.getId()).orElse(null);
            int commentNum = commentDogamRepository.countByDogamIdAndDeletedAtIsNull(d.getId());

            boolean isHated = false;
            if (userDislike != null) {
                isHated = userDislike.isDislike();
            }

            dtoList.add(DogamProfileListResponseDto.of(d.getId(), d.getDogamImage(), d.getDogamTitle(), d.getCreatedAt(), dislikeDogamNum, isHated, commentNum));
        }

        // 전체 아이템 수
        long totalItems = dogamList.size();

        // 전체 페이지 수
        int totalPages = (int) Math.ceil((double) totalItems / size);

        // 현재 페이지가 범위를 벗어나면 기본값 설정
        if (page < 0) {
            page = 0;
        } else if (page >= totalPages) {
            page = totalPages - 1;
        }

        return new PaginationResponse<>(dtoList, page, totalPages, totalItems);
    }

    //해당 유저의 친구 목록 불러오기

}
