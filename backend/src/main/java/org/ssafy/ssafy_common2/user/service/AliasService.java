package org.ssafy.ssafy_common2.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.itemshop.service.ItemDealService;
import org.ssafy.ssafy_common2.user.dto.Response.AliasCreateResponseDto;
import org.ssafy.ssafy_common2.user.entity.Alias;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.AliasRepository;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AliasService {

    private final AliasRepository aliasRepository;
    private final DynamicUserInfoRepository dynamicUserInfoRepository;
    private final UserRepository userRepository;

    private final ItemDealService itemDealService;

    // 칭호 추가
    @Transactional
    public AliasCreateResponseDto addAlias(User sender, User receiver, String aliasName){

        // 아이템 거래 내역 생성
        ItemDealList itemDealList = itemDealService.buyItem(sender, "칭호");

        // 칭호 생성
        Alias newAlias = Alias.of(receiver, aliasName);

        // 연관관계 편의 메서드 사용
        newAlias.addItemDealList(itemDealList);
        itemDealList.setAlias(newAlias);

        aliasRepository.save(newAlias);

        // 현재 칭호 변경 해주기
        setCurrentAlias(receiver.getUserInfoId(), aliasName);

        return AliasCreateResponseDto.from(newAlias);
    }

    // 현재 칭호 변경
    @Transactional
    public void setCurrentAlias(DynamicUserInfo receiver, String aliasName){

        receiver.updateCurAlias(aliasName);
        dynamicUserInfoRepository.save(receiver);
    }

    public User validateReceiverByEmail(String email){

        return userRepository.findByKakaoEmail(email)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_RECEIVER));
    }
}
