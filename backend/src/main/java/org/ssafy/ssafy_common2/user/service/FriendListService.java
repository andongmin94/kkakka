package org.ssafy.ssafy_common2.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2.user.dto.FriendInfoDto;
import org.ssafy.ssafy_common2.user.entity.FriendList;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.FriendListRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendListService {

//    private enum FriendState {
//        NONE, FRIEND, SEND, RECEIVE
//    }
//
//    private final FriendListRepository friendListRepository;
//    private final UserRepository userRepository;
//
//    // 친구 추가 요청
//    @Transactional
//    public void addFriend(User sender, User receiver){
//
//        FriendState state = getFriendState(sender, receiver);
//
//        switch (state){
//            case NONE:
//                sendFriendRequest(sender, receiver); break;
//            case RECEIVE:
//                acceptFriendRequest(sender, receiver); break;
//            case SEND:
//            case FRIEND:
//                throw new CustomException(ErrorType.DUPLICATED_REQUEST);
//        }
//    }
//
//    // 친구 신청하기
//    @Transactional
//    public void sendFriendRequest(User sender, User receiver){
//
//        FriendList friendRequest = getOrCreateFriendRequest(sender, receiver.getKakaoEmail());
//        FriendList oppositeFriendRequest = getOrCreateFriendRequest(receiver, sender.getKakaoEmail());
//
//        friendRequest.updateIsCheck(true);
//
//        friendListRepository.save(friendRequest);
//        friendListRepository.save(oppositeFriendRequest);
//    }
//
//    // 친구 신청 받기 (이미 email유저가 나에게 친구 신청을 했던 경우)
//    @Transactional
//    public void acceptFriendRequest(User sender, User receiver){
//
//        FriendList friendRequest = getFriendRequest(sender, receiver.getKakaoEmail());
//
//        friendRequest.updateIsCheck(true);
//
//        friendListRepository.save(friendRequest);
//    }
//
//    // 두 사람의 현재 친구요청 상태를 확인
//    private FriendState getFriendState(User sender, User receiver){
//
//        boolean sentRequestState = getRequestState(sender, receiver);
//        boolean receivedRequestState = getRequestState(receiver, sender);
//
//        if (sentRequestState && receivedRequestState) {
//            return FriendState.FRIEND;
//        }
//        else if (receivedRequestState) {
//            return FriendState.RECEIVE;
//        }
//        else if (sentRequestState) {
//            return FriendState.SEND;
//        }
//        else {
//            return FriendState.NONE;
//        }
//    }
//
//    // 현재 (친구)요청 승인 상태를 반환
//    public boolean getRequestState(User user1, User user2) {
//
//        return getFriendRequest(user1, user2.getKakaoEmail()).getIsCheck();
//    }
//
//    // 현재 친구 요청 데이터 반환
//    public FriendList getFriendRequest(User user1, String user2Email){
//
//        return friendListRepository
//                .findBySenderAndReceiverAndDeletedAtIsNull(user1, user2Email)
//                .orElse(FriendList.of(null, null, false));
//    }
//
//    // 현재 친구 요청 데이터가 존재하면 반환, 존재하지 않으면 객체를 생성하여 반환
//    public FriendList getOrCreateFriendRequest(User user1, String user2Email){
//
//        return friendListRepository
//                .findBySenderAndReceiverAndDeletedAtIsNull(user1, user2Email)
//                .orElse(FriendList.of(user1, user2Email, false));
//    }
//
//    // 친구 목록 반환
//    public List<FriendInfoDto> getFriendInfoList(User user) {
//
//        List<String> friendEmailList = friendListRepository.findFriendEmailsByUser(user);
//
//        return friendEmailList.stream()
//                .map(email -> FriendInfoDto.from(userRepository.findByKakaoEmail(email).orElseThrow())) // 이거 처리 Filter 등으로 변경?
//                .toList();
//    }
//
//    // 친구(toUser)가 까까의 회원인지 확인
//    public User validateFriend(String receiverEmail){
//
//        return userRepository.findByKakaoEmail(receiverEmail)
//                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_USER));
//    }

}
