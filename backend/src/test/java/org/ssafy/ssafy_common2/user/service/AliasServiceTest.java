package org.ssafy.ssafy_common2.user.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.itemshop.entity.ItemShop;
import org.ssafy.ssafy_common2.itemshop.service.ItemDealService;
import org.ssafy.ssafy_common2.notification.dto.NotificationDto;
import org.ssafy.ssafy_common2.notification.service.NotificationService;
import org.ssafy.ssafy_common2.user.dto.Response.AliasCreateResponseDto;
import org.ssafy.ssafy_common2.user.dto.Response.AliasResponseDto;
import org.ssafy.ssafy_common2.user.entity.Alias;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.AliasRepository;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AliasServiceTest {
    
    @Mock
    private AliasRepository aliasRepository;

    @Mock
    private DynamicUserInfoRepository dynamicUserInfoRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ItemDealService itemDealService;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private AliasService aliasService;
    
    private User sender;
    private User receiver;
    private ItemShop itemShop;
    
    
    @BeforeEach
    void setUp() {

        sender = User.of(101L, "kakaoImg", "username1", "kakaoEmail1", "User",
                DynamicUserInfo.of(2000, true, 0, "backImg", LocalDate.now()));
        receiver = User.of(102L, "kakaoImg", "username2", "kakaoEmail2", "User",
                DynamicUserInfo.of(2000, true, 0, "backImg", LocalDate.now()));
        
        itemShop = ItemShop.of("칭호 지정권", 10, "아이템설명");
    }

    @Test
    void 칭호_추가() {

        //Given
        ItemDealList itemDealList = ItemDealList.of(sender, itemShop);
        Alias alias = Alias.of(sender, "칭호추가해주");
        when(itemDealService.buyItem(sender, "칭호 지정권")).thenReturn(itemDealList);
        when(aliasRepository.save(any())).thenReturn(alias);

        // When
        AliasCreateResponseDto responseDto = aliasService.addAlias(sender, receiver, alias.getAliasName());

        // Then
        assertNotNull(responseDto);
        assertEquals(alias.getAliasName(), responseDto.getAliasName());
    }

    @Test
    void 현재_칭호_변경() {
        // Given
        DynamicUserInfo receiverInfo = receiver.getUserInfoId();

        // When
        assertDoesNotThrow(() -> aliasService.setCurrentAlias(receiverInfo, "칭호추가해주"));

        // Then
        assertEquals("칭호추가해주", receiverInfo.getCurAlias());
    }

    @Test
    void 칭호_알림() {
        // When
        assertDoesNotThrow(() -> aliasService.notifyAlias(sender, receiver));

        // Then
        verify(notificationService, times(1)).send(any(NotificationDto.class));
    }
}