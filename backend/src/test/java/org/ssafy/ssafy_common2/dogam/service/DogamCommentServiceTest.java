package org.ssafy.ssafy_common2.dogam.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.ssafy.ssafy_common2.dogam.dto.reqeust.DogamCommentCreateRequestDto;
import org.ssafy.ssafy_common2.dogam.dto.response.DogamCommentResponseDto;
import org.ssafy.ssafy_common2.dogam.entity.CommentDogam;
import org.ssafy.ssafy_common2.dogam.entity.Dogam;
import org.ssafy.ssafy_common2.dogam.repository.CommentDogamRepository;
import org.ssafy.ssafy_common2.dogam.repository.DogamRepository;
import org.ssafy.ssafy_common2.notification.service.NotificationService;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DogamCommentServiceTest {

    private DogamRepository dogamRepository;
    private UserRepository userRepository;
    private CommentDogamRepository commentDogamRepository;
    private NotificationService notificationService;
    private DogamCommentService dogamCommentService;


    private User user;
    private Dogam dogam;
    private DynamicUserInfo userInfo;

    @BeforeEach
    void setUp() {
        dogamRepository = mock(DogamRepository.class);
        userRepository = mock(UserRepository.class);
        commentDogamRepository = mock(CommentDogamRepository.class);
        notificationService = mock(NotificationService.class);
        dogamCommentService = new DogamCommentService(dogamRepository, userRepository, commentDogamRepository, notificationService);

        userInfo = mock(DynamicUserInfo.class);
        user = User.of(100L, "kakaoImg", "username", "kakaoEmail", "User",
                userInfo);
        dogam = Dogam.of("dogamTitle", "dogamUrl", user);

        when(userRepository.findByIdAndDeletedAtIsNull(user.getId())).thenReturn(Optional.of(user));
        when(dogamRepository.findByIdAndDeletedAtIsNull(dogam.getId())).thenReturn(Optional.of(dogam));
    }

    @Test
    void 도감_댓글_생성() {

        // Given
        DogamCommentCreateRequestDto dto = new DogamCommentCreateRequestDto();
        dto.setComment("Test comment");
        when(dogamRepository.findByIdAndDeletedAtIsNull(1L)).thenReturn(Optional.of(dogam));

        // When
        DogamCommentResponseDto responseDto = dogamCommentService.createDogamComment(dto, 1L, user);

        // Then
        verify(commentDogamRepository, times(1)).saveAndFlush(any(CommentDogam.class));
        verify(notificationService, times(1)).send(any());

    }

    @Test
    void 도감_댓글_삭제() {

        // Given
        CommentDogam commentDogam = CommentDogam.of(user.getKakaoEmail(), "dogamComment", dogam);
        when(commentDogamRepository.findByIdAndDeletedAtIsNull(1L)).thenReturn(Optional.of(commentDogam));

        // When
        dogamCommentService.deleteComment(1L, user);

        // Then
        verify(commentDogamRepository, times(1)).delete(commentDogam);
    }
}