package org.ssafy.ssafy_common2.dogam.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.handler.TransactionHandler;
import org.ssafy.ssafy_common2._common.redis.RedisLockRepository;
import org.ssafy.ssafy_common2._common.service.S3Uploader;
import org.ssafy.ssafy_common2.dogam.dto.reqeust.DogamCreateRequestDto;
import org.ssafy.ssafy_common2.dogam.dto.response.DogamCreateResponseDto;
import org.ssafy.ssafy_common2.dogam.entity.Dogam;
import org.ssafy.ssafy_common2.dogam.repository.CommentDogamRepository;
import org.ssafy.ssafy_common2.dogam.repository.DislikeDogamRepository;
import org.ssafy.ssafy_common2.dogam.repository.DogamRepository;
import org.ssafy.ssafy_common2.itemshop.entity.ItemShop;
import org.ssafy.ssafy_common2.itemshop.repository.ItemShopRepository;
import org.ssafy.ssafy_common2.notification.service.NotificationService;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.AliasRepository;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;
import org.ssafy.ssafy_common2.user.repository.FriendListRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DogamServiceTest {

    @Mock
    private S3Uploader s3Uploader;

    @Mock
    private DogamRepository dogamRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private DynamicUserInfoRepository dynamicUserInfoRepository;

    @Mock
    private ItemShopRepository itemShopRepository;

    @Mock
    private FriendListRepository friendListRepository;

    @Mock
    private AliasRepository aliasRepository;

    @Mock
    private DislikeDogamRepository dislikeDogamRepository;

    @Mock
    private CommentDogamRepository commentDogamRepository;

    @Mock
    private NotificationService notificationService;

    @Mock
    private RedisLockRepository redisLockRepository;

    @Mock
    private TransactionHandler transactionHandler;

    @InjectMocks
    private DogamService dogamService;

    private User user;
    private DynamicUserInfo userInfo;
    private Dogam dogam;
    private DogamCreateRequestDto createRequestDto;


    @BeforeEach
    void setUp() {
        userInfo = DynamicUserInfo.of(2000, true, 0, "backImg", LocalDate.now());
        user = User.of(100L, "kakaoImg", "username", "kakaoEmail", "User",
                userInfo);
        dogam = Dogam.of("dogamTitle", "dogamUrl", user);

        createRequestDto = new DogamCreateRequestDto();
        createRequestDto.setDogamTitle("dogamTitle");


    }

    @Test
    void 도감_생성() throws IOException {
        // Given
        Long friendId = 2L;
        ItemShop dogamAdd = ItemShop.of("도감추가", 1000, "도감추가");

        // When
        DogamCreateResponseDto responseDto = dogamService.createDogam(createRequestDto, friendId, user);

        // Then
        verify(redisLockRepository, times(1)).runOnLock(any(String.class), any(Supplier.class));
    }

    @Test
    void 도감_삭제() {
        // Given
        when(userRepository.findByIdAndDeletedAtIsNull(user.getId())).thenReturn(Optional.of(user));
        when(dogamRepository.findByIdAndDeletedAtIsNull(dogam.getId())).thenReturn(Optional.of(dogam));

        // When
        Map<String, Integer> result = dogamService.deleteDogam(dogam.getId(), user);

        // Then
        assertNotNull(result);
        assertTrue(result.containsKey("UserPoint : "));
    }

    @Test
    void 도감_삭제_유저없음() {

        // Given
//        when(userRepository.findByIdAndDeletedAtIsNull(user.getId())).thenReturn(Optional.empty());

        // When/Then
        assertThrows(CustomException.class, () -> dogamService.deleteDogam(dogam.getId(), user));
    }

    @Test
    void 도감_삭졔_도감없음() {
        // Given
//        when(userRepository.findByIdAndDeletedAtIsNull(user.getId())).thenReturn(Optional.of(user));
        when(dogamRepository.findByIdAndDeletedAtIsNull(dogam.getId())).thenReturn(Optional.empty());

        // When/Then
        assertThrows(CustomException.class, () -> dogamService.deleteDogam(dogam.getId(), user));

    }
}