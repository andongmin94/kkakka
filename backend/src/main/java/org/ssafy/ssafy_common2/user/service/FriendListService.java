package org.ssafy.ssafy_common2.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2.user.entity.FriendList;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.FriendListRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendListService {

    private enum FriendState {
        NONE, FRIEND, SEND, RECEIVE
    }

    private final FriendListRepository friendListRepository;
    private final UserRepository userRepository;

    // 친구 추가 요청
    public void addFriend(User sender, User receiver){

        FriendState friendState = getFriendState(sender, receiver);

        switch (friendState){
            case NONE :
                sendFriendRequest(sender, receiver.getKakaoEmail(), false);
                break;
            case RECEIVE :
                acceptFriendRequest(getFriendList(receiver, sender.getKakaoEmail()).get());
                break;
            case SEND :
            case FRIEND :
                throw new CustomException(ErrorType.NOT_FOUND_PARK_TYPE);
        }
    }

    // 친구 신청하기
    public void sendFriendRequest(User user, String receiverEmail, Boolean isCheck){

        FriendList newFriend = FriendList.of(user, receiverEmail, isCheck);

        friendListRepository.save(newFriend);
    }

    // 친구 신청 받기 (이미 email유저가 나에게 친구 신청을 했던 경우)
    public void acceptFriendRequest(FriendList friendList){

        User receiver = validateFriend(friendList.getReceiver());
        User sender = friendList.getSender();

        friendList.updateIsCheck(true);
        sendFriendRequest(receiver, sender.getKakaoEmail(), true); // 상호 확인이 가능하도록 역방향도 만들어 준다.

    }

    // 두 사람의 현재 친구 상태를 확인
    private FriendState getFriendState(User sender, User receiver){

        Optional<FriendList> sendFriendRequest = getFriendList(sender, receiver.getKakaoEmail());
        Optional<FriendList> receiveFriendRequest = getFriendList(receiver, sender.getKakaoEmail());

        if (sendFriendRequest.isPresent()) {
            // 이미 친구인 경우
            if (sendFriendRequest.get().getIsCheck())
                return FriendState.FRIEND;
            else
                return FriendState.SEND;
        } else if (receiveFriendRequest.isPresent()) {
            if (!receiveFriendRequest.get().getIsCheck())
                return FriendState.RECEIVE;
        }

        return FriendState.NONE;
    }

    public Optional<FriendList> getFriendList(User user1, String user2Email){
        return friendListRepository.findBySenderAndReceiver(user1, user2Email);
    }

    // 친구(toUser)가 까까의 회원인지 확인
    public User validateFriend(String receiverEmail){

        return userRepository.findByKakaoEmail(receiverEmail)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_USER));
    }

}
