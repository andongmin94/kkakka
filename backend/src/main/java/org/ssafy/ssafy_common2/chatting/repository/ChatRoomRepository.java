package org.ssafy.ssafy_common2.chatting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom,Long> {


    // 1) 해당 이메일 명의로 삭제 되지 않은 중계방이 생성되었는지 확인
    Optional<ChatRoom> findChatRoomByChatRoomTypeAndChatOwnerEmailAndDeletedAtIsNull(ChatRoom.ChatRoomType chatRoomType, String email);

    // 2) 해당 이메일로 만들어진 채팅방 리스트 조회
    List<ChatRoom> findAllByChatOwnerEmailAndDeletedAtIsNull(String chat_owner_email);
}
