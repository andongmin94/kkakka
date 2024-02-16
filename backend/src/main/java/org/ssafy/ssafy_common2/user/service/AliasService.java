package org.ssafy.ssafy_common2.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2.dogam.entity.Dogam;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.itemshop.service.ItemDealService;
import org.ssafy.ssafy_common2.notification.dto.NotificationDto;
import org.ssafy.ssafy_common2.notification.entity.NotificationType;
import org.ssafy.ssafy_common2.notification.service.NotificationService;
import org.ssafy.ssafy_common2.user.dto.Response.AliasCreateResponseDto;
import org.ssafy.ssafy_common2.user.dto.Response.AliasResponseDto;
import org.ssafy.ssafy_common2.user.entity.Alias;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.AliasRepository;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AliasService {

    private final AliasRepository aliasRepository;
    private final DynamicUserInfoRepository dynamicUserInfoRepository;
    private final UserRepository userRepository;

    private final ItemDealService itemDealService;
    private final NotificationService notificationService;

    // 칭호 추가
    @Transactional
    public AliasCreateResponseDto addAlias(User sender, User receiver, String aliasName){

        // 아이템 거래 내역 생성
        ItemDealList itemDealList = itemDealService.buyItem(sender, "칭호 지정권");

        // 칭호 생성
        Alias newAlias = Alias.of(receiver, aliasName);

        // 연관관계 편의 메서드 사용
        newAlias.addItemDealList(itemDealList);
        itemDealList.setAlias(newAlias);

        aliasRepository.save(newAlias);

        // 현재 칭호 변경 해주기
        setCurrentAlias(receiver.getUserInfoId(), aliasName);

        // 알림 발생
        notifyAlias(sender, receiver);
        return AliasCreateResponseDto.from(newAlias);
    }

    // 현재 칭호 변경
    @Transactional
    public void setCurrentAlias(DynamicUserInfo receiver, String aliasName){

        receiver.updateCurAlias(aliasName);
        dynamicUserInfoRepository.save(receiver);
    }

    public User validateReceiverByUserId(Long userId){

        return userRepository.findByIdAndDeletedAtIsNull(userId)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_RECEIVER));
    }

    // 칭호 목록
    @Transactional
    public List<AliasResponseDto> getAliasList(User user) {

        List<Alias> aliasList = aliasRepository.findByUserAndDeletedAtIsNull(user);
        aliasList.sort(Comparator.comparing(Alias::getCreatedAt).reversed());
        return aliasList.stream().map((alias) ->
                AliasResponseDto.of(alias.getAliasName(), alias.getCreatedAt(), alias.getItemDealList().getUser().getUserName())
        ).toList();
    }

    // 알림 만들기
    public void notifyAlias(User sender, User receiver) {

        notificationService.send(
                NotificationDto.of(
                    receiver,
                    NotificationType.NEW_ALIAS,
                    "새로운 칭호가 추가되었습니다.",
                    receiver.getKakaoProfileImg(),
                    sender.getKakaoEmail(),
                    receiver.getId()
                )
        );
    }
}
