package org.ssafy.ssafy_common2.itemshop.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.itemshop.entity.ItemShop;
import org.ssafy.ssafy_common2.itemshop.repository.ItemShopRepository;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ItemDealServiceTest {
    @Mock
    private ItemShopRepository itemShopRepository;

    @Mock
    private DynamicUserInfoRepository dynamicUserInfoRepository;

    @InjectMocks
    private ItemDealService itemDealService;

    private User user;
    private DynamicUserInfo userInfo;

    @BeforeEach
    void setUp() {
        userInfo = DynamicUserInfo.of(2000, true, 0, "backImg", LocalDate.now());
        user = User.of(100L, "kakaoImg", "username", "kakaoEmail", "User",
                userInfo);
    }

    @Test
    void 아이템_구매() {
        // Given
        ItemShop itemShop = ItemShop.of("아이템", 10, "아이템설명");
        when(itemShopRepository.findByItemNameAndDeletedAtIsNull("아이템")).thenReturn(java.util.Optional.of(itemShop));

        // When
        ItemDealList itemDealList = itemDealService.buyItem(user, "아이템");

        // Then
        assertNotNull(itemDealList);
        assertEquals(user, itemDealList.getUser());
        assertEquals(itemShop, itemDealList.getItemType());
    }

    @Test
    void 아이템명_존재_안함() {
        // Given
        when(itemShopRepository.findByItemNameAndDeletedAtIsNull("없는아이템명")).thenReturn(java.util.Optional.empty());

        // When/Then
        assertThrows(CustomException.class, () -> itemDealService.buyItem(user, "없는아이템명"));
    }

    @Test
    void 포인트_차감_성공() {
        // Given
        int userPoint = userInfo.getPoint();

        // When
        itemDealService.deductPoint(userInfo, 10);

        // Then
        assertEquals(userPoint-10, userInfo.getPoint());
    }

    @Test
    void 포인트_없음() {
        // Given
        int userPoint = userInfo.getPoint();

        // When/Then
        assertThrows(CustomException.class, () -> itemDealService.deductPoint(userInfo, userPoint + 10));
    }
}