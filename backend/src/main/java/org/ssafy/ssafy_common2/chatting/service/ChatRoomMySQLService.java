package org.ssafy.ssafy_common2.chatting.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2.chatting.dto.request.ChatMessageDto;
import org.ssafy.ssafy_common2.chatting.dto.response.ChatRoomInfoDto;
import org.ssafy.ssafy_common2.chatting.entity.ChatJoin;
import org.ssafy.ssafy_common2.chatting.entity.ChatJoinId;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;
import org.ssafy.ssafy_common2.chatting.entity.Message;
import org.ssafy.ssafy_common2.chatting.repository.ChatJoinRepository;
import org.ssafy.ssafy_common2.chatting.repository.ChatRoomRepository;
import org.ssafy.ssafy_common2.chatting.repository.MessageRepository;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomMySQLService {

    private final UserRepository userRepository;
    private final ChatJoinRepository chatJoinRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;



    // 0) 채팅방 생성
    public ChatRoom CreateChatRoom (ChatRoom.ChatRoomType chatRoomType, String chatOwnerName, String chatOwnerEmail) {
       ChatRoom chatRoom = chatRoomRepository.save(ChatRoom.of(chatRoomType, chatOwnerName, chatOwnerEmail, 0,false, 0, 0));


       return chatRoom;
    }


    // 1) 채팅 주인 이메일로 파진 채팅방 리스트 확인
    public List<ChatRoom> getChatRoomList (String ownerEmail) {

        return chatRoomRepository.findAllByChatOwnerEmailAndDeletedAtIsNull(ownerEmail);
    }

    // 2) 인수로 받은 유저 아이디가 참여한 채팅방 참여 정보 반환 (chat_join 만!)
    public List<ChatJoin> getChatJoinList (long userId) {

        return  chatJoinRepository.findAllByUserIdAndDeletedAtIsNull(userId);
    }

    // 3) 현 사용자와 인수로 주어진 Email 간의 1대1 채팅방이 있으면 방 번호 반환 없으면 -1 반환
    public long getUserConnectedRoomIdWithOwner(String ownerEmail, long attenderId, String chatRoomType) {

        long RoomIds = chatJoinRepository.getUserConnectedRoomIdsAndDeletedAtISNULL(ownerEmail, attenderId, chatRoomType).orElse(0L);

        if(RoomIds == 0) {
            return  -1;
        }else {
            return RoomIds;
        }
    }

    // 4) 요청한 Email 이름으로 만들어진 중계방이나 1대1 채팅방 있는지 조회
    public ChatRoom getRoomWithEmail(ChatRoom.ChatRoomType chatRoomType, String email) {
        ChatRoom broadCastRoom = chatRoomRepository.findChatRoomByChatRoomTypeAndChatOwnerEmailAndDeletedAtIsNull(chatRoomType, email).orElse(null);
        return  broadCastRoom;
    }

    // 5) 현재 유저를 특정 채팅방에 참여
    public void insertChatJoin (User user, ChatRoom chatRoom, int betPrice, boolean isWin) {
        chatJoinRepository.save(ChatJoin.of(new ChatJoinId(), user, chatRoom, betPrice, isWin));
    }

    // 6) 현재 유저가 참여한 채팅방 리스트 정보 반환 하기
    public List<ChatRoomInfoDto> getChatRoomInfo (long userId) {

        // 유저 아이디로 그 사람이 참여한 모든 채팅방 번호를 얻기 (chatJoin 객체 다 가져옴)
        List<ChatJoin> temp = chatJoinRepository.findAllByUserIdAndDeletedAtIsNull(userId);
        ArrayList<ChatRoomInfoDto> ans = new ArrayList<>();

        // 해당 채팅방 번호 하나하나마다 필요한 정보 얻어내서 element 객체에 담기
        for (int i = 0; i < temp.size(); i++) {
            ChatRoomInfoDto element = new ChatRoomInfoDto();

            // 6-1) 채팅방 정보로 주인 이메일과 아이디 얻기
            ChatRoom roomInfo = chatRoomRepository.findById(temp.get(i).getChatJoinId().getChatRoomId()).orElse(null);
            element.setRoomId(temp.get(i).getChatJoinId().getChatRoomId());
            element.setChatRoomType(Optional.ofNullable(roomInfo.getChatRoomType()).orElse(ChatRoom.ChatRoomType.DEAD));
            element.setFriendName(Optional.ofNullable(roomInfo.getChatOwnerName()).orElse("해당 채팅방의 주인ID을 찾지 못했습니다."));
            element.setFriendEmail(Optional.ofNullable(roomInfo.getChatOwnerEmail()).orElse("해당 채팅방 주인의Email을 찾지 못했습니다."));
            element.setTenMinute(Optional.ofNullable(roomInfo.isTenMinute()).orElse(false));
            // 6-2) 유저 아이디로 유저 정보 얻기
            User friend = userRepository.findByKakaoEmailAndDeletedAtIsNull(roomInfo.getChatOwnerEmail()).orElse(null);

            if(friend !=null) {
                element.setFriendImgUrl(friend.getKakaoProfileImg());
                element.setFriendAlias(friend.getUserInfoId().getCurAlias());
                element.setLogin(friend.getUserInfoId().isLogin());
            }

            // 6-3) 채팅방 번호로 메세지 정보 얻기
            Message lastMessage = chatJoinRepository.getLastMessage(temp.get(i).getChatJoinId().getChatRoomId()).orElse(null);
            if(lastMessage != null) {
                element.setLastMessage(lastMessage.getContent());
                element.setLastWrittenMessageTime(lastMessage.getCreatedAt());
            }else{
                element.setLastMessage("아직 서로 대화를 하지 않았어요!, 채팅을 시작하세요!");
                element.setLastWrittenMessageTime(null);
            }

            // 6-4) 채팅방 안 읽은 메세지 수 구하기
            int unReadMessageCnt = chatJoinRepository.getUnreadMessageCnt(temp.get(i).getChatJoinId().getChatRoomId()).orElse(0);
            element.setUnreadMessageCnt(unReadMessageCnt);

            // 6-5) 답속에 포함
            ans.add(element);
        }

        return ans;
    }


    // 7) 채팅방 인원 +1 혹은 -1
    public void updateUserCnt(long roomId, String mode) {


        // 채팅방 특정
        ChatRoom room = chatRoomRepository.findById(roomId).orElse(null);



        // 이전 채팅방 인원 수
        int cnt = room.getUserCnt();
        System.out.println("방의 이전 인원수: " + cnt);
        // 채팅방 인원 +1
        if(mode.equals("PLUS")){
            chatRoomRepository.updateUserCnt(cnt+1, roomId);
        }else{
            chatRoomRepository.updateUserCnt(cnt-1, roomId);
        }

    }

    // 메세지 Entity를 메세지 Dto로 전환
    public ChatMessageDto messageDtoConverter (Message message) {
        return ChatMessageDto.of(
                message.getMessageType().name(),
                message.getContent(),
                message.getChatJoin().getUser().getId(),
                message.getChatJoin().getChatRoom().getId(),
                message.getCreatedAt(),
                message.getUpdatedAt()
        );
    };

    // 8) 특정 방의 최근 메세지 100개 주기
    public Page<ChatMessageDto> loadChatRoomMessage(long chatRoomId, int pageNo, String criteia){

        // 1) 최신 순, 받은 페이지부터 100개 꺼내도록 설정
        Pageable pageable = PageRequest.of(pageNo,100, Sort.by(Sort.Direction.DESC, criteia));

        // 2) 실제 꺼내는 로직
        Page<Message> messages = messageRepository.findAllByChatJoin_ChatRoom_Id(chatRoomId, pageable);

        return messages.map(this::messageDtoConverter);
    }


    // 9) 라이브 중인 친구 채팅방 얻기
    public List<ChatRoomInfoDto> findAllBroadCastsRoom(){

        return null;
    }
}

/*
*
*
* */

