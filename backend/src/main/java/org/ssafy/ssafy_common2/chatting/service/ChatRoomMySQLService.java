package org.ssafy.ssafy_common2.chatting.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2.chatting.entity.ChatJoin;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;
import org.ssafy.ssafy_common2.chatting.repository.ChatJoinRepository;
import org.ssafy.ssafy_common2.chatting.repository.ChatRoomRepository;
import org.ssafy.ssafy_common2.chatting.repository.MessageRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomMySQLService {

    private final ChatJoinRepository chatJoinRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;


    // 0) 채팅방 생성
    public ChatRoom CreateChatRoom (ChatRoom.ChatRoomType chatRoomType, String chatOwnerName, String chatOwnerEmail) {
       ChatRoom chatRoom = chatRoomRepository.save(ChatRoom.of(chatRoomType, chatOwnerName, chatOwnerEmail));

       return chatRoom;
    }


    // 1) 채팅 주인 이메일로 파진 채팅방 리스트 확인
    public List<ChatRoom> getChatRoomList (String ownerEmail) {

        return chatRoomRepository.findAllByChatOwnerEmailAndDeletedAtIsNull(ownerEmail);
    }

    // 2) 인수로 받은 유저 아이디가 참여한 채팅방 ID 리스트 확인
    public List<ChatJoin> getChatJoinList (long userId) {

        return  chatJoinRepository.findAllByUserIdAndDeletedAtIsNull(userId);
    }

    // 3) 현 사용자와 요청한 Email 간의 1대1 채팅방이 있으면 방 번호 반환 없으면 -1 반환
    public long getUserConnectedRoomIdWithOwner(String ownerEmail, long attenderId) {

        long RoomIds = chatJoinRepository.getUserConnectedRoomIdsAndDeletedAtISNULL(ownerEmail, attenderId).orElse(0L);

        if(RoomIds == 0) {
            return  -1;
        }else {
            return RoomIds;
        }
    }

    // 4) 요청한 Email 이름으로 만들어진 중계방이 있는지 조회
    public ChatRoom getBroadcastRoomWithEmail(ChatRoom.ChatRoomType chatRoomType, String email) {
        ChatRoom broadCastRoom = chatRoomRepository.findChatRoomByChatRoomTypeAndChatOwnerEmailAndDeletedAtIsNull(chatRoomType, email).orElse(null);
        return  broadCastRoom;
    }

}

/*
*
*
* */

