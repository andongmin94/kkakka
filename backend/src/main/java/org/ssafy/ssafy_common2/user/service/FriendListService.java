package org.ssafy.ssafy_common2.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2.notification.dto.NotificationDto;
import org.ssafy.ssafy_common2.notification.entity.NotificationType;
import org.ssafy.ssafy_common2.notification.service.NotificationService;
import org.ssafy.ssafy_common2.user.dto.FriendInfoDto;
import org.ssafy.ssafy_common2.user.dto.Response.FriendStateResponseDto;
import org.ssafy.ssafy_common2.user.dto.Response.UserDataResponseDto;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.FriendList;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;
import org.ssafy.ssafy_common2.user.repository.FriendListRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendListService {

    private enum FriendState {
        NONE, FRIEND, SEND, RECEIVE
    }

    private final FriendListRepository friendListRepository;
    private final UserRepository userRepository;
    private final DynamicUserInfoRepository dynamicUserInfoRepository;
    private final NotificationService notificationService;

    // 친구 추가 요청
    @Transactional
    public MsgType editFriendState(User sender, Long receiverId) {

        User receiver = validateReceiverByUserId(receiverId);

        // 현재 친구 상태 확인
        FriendState state = getFriendState(sender, receiver);

        switch (state) {
            case NONE: // 아무 관계 아님 -> 친구 요청 가능
                return sendFriendRequest(sender, receiver);
            case RECEIVE: // sender가 친구 요청 받음 -> 친구 수락
                return acceptFriendRequest(sender, receiver);
            case SEND: // sender가 친구 요청함 -> 친구 요청 취소
                return cancelFriendRequest(sender, receiver);
            case FRIEND: // 친구 사이 -> 친구 끊기
            default:
                return breakOffFriendRelationship(sender, receiver);
        }
    }

    // 친구 신청하기
    @Transactional
    public MsgType sendFriendRequest(User sender, User receiver) {

        FriendList friendRequest = getOrCreateFriendRequest(sender, receiver);
        FriendList oppositeFriendRequest = getOrCreateFriendRequest(receiver, sender);

        friendRequest.updateIsCheck(true);

        friendListRepository.save(friendRequest);
        friendListRepository.save(oppositeFriendRequest);

        // 친구 신청 알림 보내기
        notifyFriendRequest(sender, receiver);

        return MsgType.SEND_FRIEND_REQUEST_SUCCESSFULLY;
    }

    // 친구 신청 받기 (이미 email유저가 나에게 친구 신청을 했던 경우)
    @Transactional
    public MsgType acceptFriendRequest(User sender, User receiver) {

        FriendList friendRequest = getFriendRequest(sender, receiver);
        friendRequest.updateIsCheck(true);
        friendListRepository.save(friendRequest);

        return MsgType.RECEIVE_FRIEND_REQUEST_SUCCESSFULLY;
    }

    // 친구 신청 취소하기
    @Transactional
    public MsgType cancelFriendRequest(User sender, User receiver) {

        FriendList friendRequest = getFriendRequest(sender, receiver);
        friendRequest.updateIsCheck(false);
        friendListRepository.save(friendRequest);

        return MsgType.CANCEL_FRIEND_REQUEST_SUCCESSFULLY;
    }

    // 친구 끊기
    @Transactional
    public MsgType breakOffFriendRelationship(User sender, User receiver) {

        FriendList friendRequest = getOrCreateFriendRequest(sender, receiver);
        FriendList oppositeFriendRequest = getOrCreateFriendRequest(receiver, sender);

        friendRequest.updateIsCheck(false);
        oppositeFriendRequest.updateIsCheck(false);

        friendListRepository.save(friendRequest);
        friendListRepository.save(oppositeFriendRequest);

        return MsgType.BREAK_OFF_FRIEND_RELATIONSHIP_SUCCESSFULLY;
    }

    // 두 유저의 현재 친구요청 상태를 리턴
    public FriendStateResponseDto createFriendStateResponse(User sender, Long receiverId) {

        User receiver = validateReceiverByUserId(receiverId);
        return FriendStateResponseDto.of(getFriendState(sender, receiver).toString());
    }

    // 두 사람의 현재 친구요청 상태를 확인
    private FriendState getFriendState(User sender, User receiver) {

        boolean sentRequestState = getRequestState(sender, receiver);
        boolean receivedRequestState = getRequestState(receiver, sender);

        if (sentRequestState && receivedRequestState) {
            return FriendState.FRIEND;
        } else if (receivedRequestState) {
            return FriendState.RECEIVE;
        } else if (sentRequestState) {
            return FriendState.SEND;
        } else {
            return FriendState.NONE;
        }
    }

    // 현재 (친구)요청 승인 상태를 반환
    public boolean getRequestState(User sender, User receiver) {

        return getFriendRequest(sender, receiver).getIsCheck();
    }

    // 현재 친구 요청 데이터 반환
    public FriendList getFriendRequest(User sender, User receiver) {

        return friendListRepository
                .findBySenderAndReceiverAndDeletedAtIsNull(sender, receiver)
                .orElse(FriendList.of(null, null, false));
    }

    // 현재 친구 요청 데이터가 존재하면 반환, 존재하지 않으면 객체를 생성하여 반환
    public FriendList getOrCreateFriendRequest(User sender, User receiver) {

        return friendListRepository
                .findBySenderAndReceiverAndDeletedAtIsNull(sender, receiver)
                .orElse(FriendList.of(sender, receiver, false));
    }

    // 친구 목록 반환
    public List<FriendInfoDto> getFriendInfoList(User user) {

        return friendListRepository.findFriendsByUser(user).stream().map(FriendInfoDto::from).toList();
    }

    // 친구(toUser)가 까까의 회원인지 확인
    public User validateReceiverByUserId(Long receiverId) {

        return userRepository.findByIdAndDeletedAtIsNull(receiverId)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_RECEIVER));
    }

    // 친구 신청하기
    private void notifyFriendRequest(User sender, User receiver) {

        notificationService.send(
                NotificationDto.of(
                        receiver,
                        NotificationType.FRIEND_REQUEST,
                        sender.getUserName() + "님이 친구요청을 보냈습니다.",
                        sender.getKakaoProfileImg(),
                        sender.getKakaoEmail(),
                        sender.getId()
                )
        );
    }
}
