package org.ssafy.ssafy_common2.user.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2.notification.dto.NotificationDto;
import org.ssafy.ssafy_common2.notification.service.NotificationService;
import org.ssafy.ssafy_common2.user.dto.FriendInfoDto;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.FriendList;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.FriendListRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FriendListServiceTest {

    @Mock
    private FriendListRepository friendListRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private FriendListService friendListService;

    private User sender;
    private User receiver;

    @BeforeEach
    void setUp() {
        sender = User.of(101L, "kakaoImg", "username1", "kakaoEmail1", "User",
            DynamicUserInfo.of(2000, true, 0, "backImg", LocalDate.now()));
        receiver = User.of(102L, "kakaoImg", "username2", "kakaoEmail2", "User",
                DynamicUserInfo.of(2000, true, 0, "backImg", LocalDate.now()));

    }

    @Test
    void 친구신청() {
        // Given
        when(userRepository.findByIdAndDeletedAtIsNull(2L)).thenReturn(Optional.of(receiver));
        when(friendListRepository.findBySenderAndReceiverAndDeletedAtIsNull(sender, receiver)).thenReturn(Optional.empty());

        // When
        MsgType msgType = friendListService.editFriendState(sender, 2L);

        // Then
        assertEquals(MsgType.SEND_FRIEND_REQUEST_SUCCESSFULLY, msgType);
        verify(friendListRepository, times(2)).save(any(FriendList.class));
        verify(notificationService, times(1)).send(any(NotificationDto.class));
    }

    @Test
    void 친구신청_취소() {
        // Given
        when(userRepository.findByIdAndDeletedAtIsNull(2L)).thenReturn(Optional.of(receiver));
        when(friendListRepository.findBySenderAndReceiverAndDeletedAtIsNull(sender, receiver))
                .thenReturn(Optional.of(FriendList.of(sender, receiver, true)));

        // When
        MsgType msgType = friendListService.editFriendState(sender, 2L);

        // Then
        assertEquals(MsgType.CANCEL_FRIEND_REQUEST_SUCCESSFULLY, msgType);
        verify(friendListRepository, times(1)).save(any(FriendList.class));
    }

    @Test
    void 친구신청_받기() {
        // Given
        FriendList friendList = FriendList.of(sender, receiver, false);

        when(friendListRepository.findBySenderAndReceiverAndDeletedAtIsNull(sender, receiver))
                .thenReturn(Optional.of(friendList));

        // When
        MsgType msgType = friendListService.acceptFriendRequest(sender, receiver);

        // Then
        assertEquals(MsgType.RECEIVE_FRIEND_REQUEST_SUCCESSFULLY, msgType);
        verify(friendListRepository, times(1)).save(any(FriendList.class));
    }


    @Test
    void 친구끊기() {
        // Given
        FriendList friendList = FriendList.of(sender, receiver, true);

        when(friendListRepository.findBySenderAndReceiverAndDeletedAtIsNull(sender, receiver))
                .thenReturn(Optional.of(friendList));

        //When
        MsgType msgType = friendListService.breakOffFriendRelationship(sender, receiver);

        // Then
        assertEquals(MsgType.BREAK_OFF_FRIEND_RELATIONSHIP_SUCCESSFULLY, msgType);
        verify(friendListRepository, times(2)).save(any(FriendList.class));
    }

    @Test
    void 친구목록_친구없음() {

        // When
        List<FriendInfoDto> infoList = friendListService.getFriendInfoList(sender);

        // Then
        assertNotNull(infoList);
        assertEquals(0, infoList.size());
    }
}