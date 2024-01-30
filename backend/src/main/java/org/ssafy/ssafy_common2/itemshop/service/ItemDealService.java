package org.ssafy.ssafy_common2.itemshop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.itemshop.entity.ItemShop;
import org.ssafy.ssafy_common2.itemshop.repository.ItemShopRepository;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;

@Service
@RequiredArgsConstructor
public class ItemDealService {

    private final ItemShopRepository itemShopRepository;
    private final DynamicUserInfoRepository dynamicUserInfoRepository;

    // 아이템 구매
    @Transactional
    public ItemDealList buyItem(User user, String itemType) {

        // 구매할 아이템
        ItemShop itemShop = itemShopRepository.findByItemNameAndDeletedAtIsNull(itemType)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_ITEM_SHOP));

        // 포인트 차감
        deductPoint(user.getUserInfoId(), itemShop.getItemPrice());

        // 아이템 구매내역 생성 및 반환
        return ItemDealList.of(user, itemShop);
    }

    // 포인트 차감
    @Transactional
    public void deductPoint(DynamicUserInfo user, int itemPrice) {

        if (user.getPoint() < itemPrice) {
            throw new CustomException(ErrorType.NOT_ENOUGH_POINT);
        }

        user.minusPoint(itemPrice);
        dynamicUserInfoRepository.save(user);
    }

}
