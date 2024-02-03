package org.ssafy.ssafy_common2.dogam.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.service.S3Uploader;
import org.ssafy.ssafy_common2.dogam.dto.reqeust.DogamCreateRequestDto;
import org.ssafy.ssafy_common2.dogam.dto.response.DogamCommentResponseDto;
import org.ssafy.ssafy_common2.dogam.dto.response.DogamCreateResponseDto;
import org.ssafy.ssafy_common2.dogam.dto.response.DogamDetailResponseDto;
import org.ssafy.ssafy_common2.dogam.dto.response.DogamMainListResponseDto;
import org.ssafy.ssafy_common2.dogam.entity.CommentDogam;
import org.ssafy.ssafy_common2.dogam.entity.DislikeDogam;
import org.ssafy.ssafy_common2.dogam.entity.Dogam;
import org.ssafy.ssafy_common2.dogam.repository.CommentDogamRepository;
import org.ssafy.ssafy_common2.dogam.repository.DislikeDogamRepository;
import org.ssafy.ssafy_common2.dogam.repository.DogamRepository;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.itemshop.entity.ItemShop;
import org.ssafy.ssafy_common2.itemshop.repository.ItemShopRepository;
import org.ssafy.ssafy_common2.user.entity.Alias;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.FriendList;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.AliasRepository;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;
import org.ssafy.ssafy_common2.user.repository.FriendListRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
public class DogamService {

    private final S3Uploader s3Uploader;
    private final DogamRepository dogamRepository;
    private final UserRepository userRepository;
    private final DynamicUserInfoRepository dynamicUserInfoRepository;
    private final ItemShopRepository itemShopRepository;
    private final FriendListRepository friendListRepository;
    private final AliasRepository aliasRepository;
    private final DislikeDogamRepository dislikeDogamRepository;
    private final CommentDogamRepository commentDogamRepository;

    // 도감 만들기
    public DogamCreateResponseDto createDogam(DogamCreateRequestDto dto, String email, User sender) throws IOException {

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

        User receiver = userRepository.findByKakaoEmailAndDeletedAtIsNull(email).orElseThrow(
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
            imgUrl = s3Uploader.upload(dto.getImgUrl());
        }
        // imgURL을 만들어서 S3에 저장 끝

        Dogam dogam = Dogam.of(dto.getDogamTitle(), imgUrl, receiver);

        // 연관관계 편의 매서드 사용
        dogam.addItemDealList(itemDealList);
        itemDealList.setDogam(dogam);

        dogamRepository.save(dogam);

        DogamCreateResponseDto responseDto = DogamCreateResponseDto.of(imgUrl, dto.getDogamTitle());
        return responseDto;
    }

    public void deleteDogam(Long dogamId, User user) {

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
    }

    // 메인 페이지 도감 리스트 불러오기 메서드
    public List<DogamMainListResponseDto> dogamList(User user) {

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        // 수정 예정 -> 적절한 도감 리스트 띄우는 로직 개발 필요, 현재는 해당 유저의 친구들의 도감만 나옴
        List<FriendList> friendLists = friendListRepository.findAllBySenderOrReceiverAndIsCheckAndDeletedAtIsNull(user, user, true);
        List<Dogam> dogamList = new ArrayList<>();
        //찬구의 도감 리스트 전부 불러오기
        for (FriendList f : friendLists) {
            if (Objects.equals(f.getReceiver().getId(), user.getId())) {
                dogamList.addAll(dogamRepository.findAllByUserIdAndDeletedAtIsNull(f.getSender().getId()));
            } else {
                dogamList.addAll(dogamRepository.findAllByUserIdAndDeletedAtIsNull(f.getReceiver().getId()));
            }
        }
        List<DogamMainListResponseDto> responseDtoList = new ArrayList<>();

        for (Dogam d : dogamList) {

            // 친구의 가장 최근 칭호 불러오기
            Alias alias = aliasRepository.findFirstByUserIdAndDeletedAtIsNullOrderByCreatedAtDesc(d.getUser().getId()).orElse(null);

            // 해당 도감의 가장 최근 댓글 불러오기
            CommentDogam commentDogam = commentDogamRepository.findFirstByDogamIdAndDeletedAtIsNullOrderByCreatedAtDesc(d.getId());

            // 위에서 찾은 댓글의 주인
            User commentUser = null;
            if (commentDogam != null) {
                commentUser = userRepository.findByKakaoEmailAndDeletedAtIsNull(commentDogam.getUserEmail()).orElseThrow(
                        () -> new CustomException(ErrorType.NOT_FOUND_USER)
                );
            }
            boolean isHated = false;
            DislikeDogam dislikeDogam = dislikeDogamRepository.findByUserEmailAndDogamIdAndDeletedAtIsNull(user.getKakaoEmail(), d.getId()).orElse(null);
            if (dislikeDogam != null) {
                if (dislikeDogam.isDislike()) {
                    isHated = true;
                }
            }


            // 댓글 주인의 프로필 사진, 댓글의 내용, 댓글 주인의 이름, 댓글 주인의 이메일 저장
            DogamCommentResponseDto dogamCommentResponseDto = DogamCommentResponseDto.of(
                    commentUser != null ? commentUser.getId() : null,
                    commentUser != null ? commentUser.getKakaoProfileImg() : null,
                    commentDogam != null ? commentDogam.getDogamComment() : null,
                    commentUser != null ? commentUser.getUserName() : null,
                    commentUser != null ? commentUser.getKakaoEmail() : null,
                    commentUser != null ? commentUser.getCreatedAt() : null);

            int dislikeNum = dislikeDogamRepository.countByDogamIdAndDeletedAtIsNull(d.getId());
            responseDtoList.add(DogamMainListResponseDto.of(d.getUser().getId(), d.getDogamTitle(), d.getId(), d.getUser().getUserName(), d.getUser().getKakaoEmail(), alias!=null?alias.getAliasName():null, d.getDogamImage(), d.getUser().getKakaoProfileImg(),
                    dislikeNum, isHated, dogamCommentResponseDto));
        }

        return responseDtoList;
    }

    public DogamDetailResponseDto dogamDetail(Long dogamId, User user) {

        Dogam dogam = dogamRepository.findByIdAndDeletedAtIsNull(dogamId).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_DOGAM)
        );

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        List<CommentDogam> commentDogamList = commentDogamRepository.findAllByDogamIdAndDeletedAtIsNull(dogamId);
        List<DogamCommentResponseDto> dogamCommentResponseDtos = new ArrayList<>();

        for (CommentDogam cd : commentDogamList) {
            User commentUser = userRepository.findByKakaoEmailAndDeletedAtIsNull(cd.getUserEmail()).orElseThrow(
                    () -> new CustomException(ErrorType.NOT_FOUND_USER)
            );
            dogamCommentResponseDtos.add(DogamCommentResponseDto.of(commentUser.getId(), commentUser.getKakaoProfileImg(), cd.getDogamComment(),
                    commentUser.getUserName(), commentUser.getKakaoEmail(), cd.getCreatedAt()));
        }

        DogamDetailResponseDto dto = DogamDetailResponseDto.of(user.getId(), user.getKakaoProfileImg(), dogam.getDogamTitle(), user.getUserName(), user.getKakaoEmail()
                , dogam.getCreatedAt(), dogamCommentResponseDtos);
        return dto;
    }

    //해당 유저의 친구 목록 불러오기

}
