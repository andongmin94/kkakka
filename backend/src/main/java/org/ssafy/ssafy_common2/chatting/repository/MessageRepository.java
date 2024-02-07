package org.ssafy.ssafy_common2.chatting.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2.chatting.dto.request.ChatMessageDto;
import org.ssafy.ssafy_common2.chatting.entity.Message;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Transactional
public interface MessageRepository extends JpaRepository<Message,Long> {

    // 0) 메세지 넣는 함수
    @Modifying
    @Query(value = "insert into message(content, message_type, user_id, chat_room_id, img_code, created_at, updated_at ) " +
            "values (:content, :message_type, :user_id, :chat_room_id, :img_code, :created_at, :updated_at )",nativeQuery = true)
    void InsertMessage(@Param("content") String content, @Param("message_type") String message_type,
                       @Param("user_id") long user_id, @Param("chat_room_id") long chat_room_id,
                       @Param("img_code") String img_code,
                       @Param("created_at")LocalDateTime created_at, @Param("updated_at") LocalDateTime updated_at);

    // 1) 방번호에 맞는 메세지 찾기
    Page<Message> findAllByChatJoin_ChatRoom_Id(long roomId, Pageable pageable);

    // 2) 내가 참여한 채팅방의 가장 최근 메세지
    @Query(value = "SELECT * FROM message m WHERE m.deleted_at IS NULL AND m.chat_room_id = :roomId ORDER BY m.created_at DESC LIMIT 1 ", nativeQuery = true)
    Optional<Message> getLastMessage(@Param("roomId") long roomId);

    // 3) 채팅방 수정 일자와 비교하여 안 읽은 메세지 수 뽑기
    @Query(value ="SELECT COUNT(*) FROM message m WHERE m.created_at > (SELECT updated_at from (SELECT * from chat_join cj where cj.chat_room_id = :chatRoomId AND cj.deleted_at is null limit 1) temp )", nativeQuery = true)
    Optional<Integer> getUnreadMessageCnt (@Param("chatRoomId") long chatRoomId);

    // 4) 챗봇 메세지만 뽑아내기


    List<Message> findAllByChatJoin_ChatJoinId_ChatRoomIdAndMessageType(
             long chatRoomId, Message.MessageType messageType
    );

    // 5) 특정 시간 이후의 메세지만 뽑아내기
    List<Message> findAllByChatJoin_User_IdAndChatJoin_ChatJoinId_ChatRoomIdAndCreatedAtBefore(
            long usrId, long chatRoomId, LocalDateTime created_at);

}
