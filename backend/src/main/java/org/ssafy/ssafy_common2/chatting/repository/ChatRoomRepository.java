package org.ssafy.ssafy_common2.chatting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom,Long> {


    // 1) 해당 이메일 명의로 삭제 되지 않은 중계방이 생성되었는지 확인
    Optional<ChatRoom> findChatRoomByChatRoomTypeAndChatOwnerEmailAndDeletedAtIsNull(ChatRoom.ChatRoomType chatRoomType, String email);

    // 2) 해당 이메일로 만들어진 채팅방 리스트 조회
    List<ChatRoom> findAllByChatOwnerEmailAndDeletedAtIsNull(String chat_owner_email);

    // 3) 채팅방을 유저 중 한 명이 나갔을 때, 채팅방 수정일자를 업데이트 한다.
    @Query(value = "UPDATE chat_room cr set cr.updated_at = :now where cr.chat_room_id = :roomId", nativeQuery = true)
    void updateModifiedAt(LocalDateTime now, long roomId);


    @Query(value = "UPDATE chat_room cr set cr.user_cnt =:cnt where cr.chat_room_id = :roomId", nativeQuery = true)
    void updateUserCnt(int cnt, long roomId);



}
