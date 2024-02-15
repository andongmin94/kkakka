package org.ssafy.ssafy_common2.itemshop.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.ssafy.ssafy_common2.itemshop.dto.request.MegaphoneCreateRequestDto;
import org.ssafy.ssafy_common2.itemshop.dto.response.MegaphoneCreateResponseDto;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.itemshop.entity.ItemShop;
import org.ssafy.ssafy_common2.itemshop.entity.Megaphone;
import org.ssafy.ssafy_common2.itemshop.repository.MegaphoneEventRepository;
import org.ssafy.ssafy_common2.itemshop.repository.MegaphoneRepository;
import org.ssafy.ssafy_common2.notification.repository.EmitterRepository;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class MegaphoneServiceTest {

    @Mock
    private MegaphoneRepository megaphoneRepository;

    @Mock
    private EmitterRepository emitterRepository;

    @Mock
    private MegaphoneEventRepository megaphoneEventRepository;

    @Mock
    private ItemDealService itemDealService;

    @InjectMocks
    private MegaphoneService megaphoneService;

    private User user;
    private DynamicUserInfo userInfo;

    @BeforeEach
    void setUp() {
        userInfo = DynamicUserInfo.of(2000, true, 0, "backImg", LocalDate.now());
        user = User.of(100L, "kakaoImg", "username", "kakaoEmail", "User",
                userInfo);
    }

    @Test
    void 확성기_생성_성공() {
        // Given
        MegaphoneCreateRequestDto requestDto = new MegaphoneCreateRequestDto("확성기 내용");
        ItemShop itemShop = ItemShop.of("확성기", 10, "아이템설명");
        ItemDealList itemDealList = ItemDealList.of(user, itemShop);

        Megaphone megaphone = Megaphone.of(requestDto.getContent());

        when(itemDealService.buyItem(user, "확성기")).thenReturn(itemDealList);
        when(megaphoneRepository.save(any())).thenReturn(megaphone);

        // When
        MegaphoneCreateResponseDto responseDto = megaphoneService.createMegaphone(user, requestDto);

        // Then
        assertNotNull(responseDto);
        assertEquals(user.getKakaoEmail(), responseDto.getUserEmail());
        assertEquals(megaphone.getContent(), responseDto.getContent());
    }

}