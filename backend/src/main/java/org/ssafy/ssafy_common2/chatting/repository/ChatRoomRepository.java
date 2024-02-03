package org.ssafy.ssafy_common2.chatting.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
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
    @Modifying
    @Transactional
    @Query(value = "UPDATE chat_room cr set cr.updated_at = :now where cr.chat_room_id = :roomId", nativeQuery = true)
    void updateModifiedAt(@Param("now") LocalDateTime now, @Param("roomId") long roomId);


    // 4) 방의 인원수를 줄이거나 늘림
    @Modifying
    @Transactional
    @Query(value = "UPDATE chat_room cr set cr.user_cnt =:cnt where cr.id = :roomId", nativeQuery = true)
    void updateUserCnt(@Param("cnt") int cnt, @Param("roomId") long roomId);


    // 5) 중계방이면서, 10분이 안 지났고, Delete 되지 않은 함수
    Optional<List<ChatRoom>> findAllByChatRoomTypeAndTenMinuteIsFalseAndDeletedAtIsNull(ChatRoom.ChatRoomType chatRoomType);

    // 6) 특정 채팅방의 10분 지났는지 여부를 true로 변경!
    @Modifying
    @Transactional
    @Query(value = "UPDATE chat_room cr set cr.ten_minute = true where cr.id = :roomId", nativeQuery = true)
    void updateIsTenMinute(@Param("roomId") long roomId);

    // 7) 채팅방 이긴다 Point 최신화
    @Modifying
    @Query(value = "UPDATE chat_room cr SET cr.win_point = :betPrice WHERE cr.id = :roomId ", nativeQuery = true)
    void updateWinPoint(@Param("roomId") long roomId, @Param("betPrice") int betPrice);


    // 8) 채팅방 진다 Point 최신화
    @Modifying
    @Query(value = "UPDATE chat_room cr SET cr.lose_point =:betPrice WHERE cr.id = :roomId", nativeQuery = true)
    void updateLosePoint(@Param("roomId") long roomId, @Param("betPrice") int betPrice);

    // 9) MANY 이면서 delete 되지 않은 채팅방 리스트 전부 조회
    List<ChatRoom> findChatRoomByChatRoomTypeAndDeletedAtIsNull(ChatRoom.ChatRoomType chatRoomType);


    @Modifying
    @Query(value = "UPDATE chat_room cr SET cr.deleted_at = :deleted_at WHERE cr.id = :roomId", nativeQuery = true)
    void deleteChatRoomById(@Param("roomId") long roomId, @Param("delete_at") LocalDateTime deleted_at);
}
