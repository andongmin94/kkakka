package org.ssafy.ssafy_common2.dogam.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2.dogam.entity.DislikeDogam;
import org.ssafy.ssafy_common2.dogam.entity.Dogam;
import org.ssafy.ssafy_common2.dogam.repository.CommentDogamRepository;
import org.ssafy.ssafy_common2.dogam.repository.DislikeDogamRepository;
import org.ssafy.ssafy_common2.dogam.repository.DogamRepository;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DogamDislikeServiceTest {

    @Mock
    private DogamRepository dogamRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private CommentDogamRepository commentDogamRepository;
    @Mock
    private DislikeDogamRepository dislikeDogamRepository;
    @InjectMocks
    private DogamDislikeService dogamDislikeService;

    private User user;
    private Dogam dogam;
    private DynamicUserInfo userInfo;


    @BeforeEach
    void setUp() {

        userInfo = mock(DynamicUserInfo.class);
        user = User.of(100L, "kakaoImg", "username", "kakaoEmail", "User",
                userInfo);
        dogam = Dogam.of("dogamTitle", "dogamUrl", user);

        when(userRepository.findByIdAndDeletedAtIsNull(user.getId())).thenReturn(Optional.of(user));
    }

    @Test
    void 도감_싫어요_생성() {

        // Given
        User user2 = User.of(101L, "kakaoImg2", "username2", "kakaoEmail2", "User",
                userInfo);
        when(dogamRepository.findByIdAndDeletedAtIsNull(dogam.getId())).thenReturn(Optional.of(dogam));

        // When
        dogamDislikeService.createDogamDislike(dogam.getId(), user2);

        // Then
        verify(dislikeDogamRepository, times(1)).save(any());
    }

    @Test
    void 도감_싫어요_생성_본인도감() {


        // When / Then
        assertThrows(CustomException.class, () -> {
            dogamDislikeService.createDogamDislike(dogam.getId(), user);
        });

    }

    @Test
    void 도감_싫어요_삭제() {

        // Given
        User user2 = User.of(101L, "kakaoImg2", "username2", "kakaoEmail2", "User",
                userInfo);

        DislikeDogam dislikeDogam = DislikeDogam.of("kakaoEmail2", true, dogam);
        when(dislikeDogamRepository.findByUserEmailAndDogamIdAndDeletedAtIsNull(user2.getKakaoEmail(), dogam.getId())).thenReturn(Optional.of(dislikeDogam));

        // When
        dogamDislikeService.deleteDogamDislike(dogam.getId(), user2);

        // Then
        assertEquals(false, dislikeDogam.isDislike());
    }
}