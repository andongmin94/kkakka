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


    // 1) 메세지 넣는 함수
    @Modifying
    @Query(value = "insert into message(content, message_type, user_id, chat_room_id, created_at, updated_at ) " +
            "values (:content, :message_type, :user_id, :chat_room_id, :created_at, :updated_at )",nativeQuery = true)
    void InsertMessage(@Param("content") String content, @Param("message_type") String message_type,
                       @Param("user_id") long user_id, @Param("chat_room_id") long chat_room_id,
                       @Param("created_at")LocalDateTime created_at, @Param("updated_at") LocalDateTime updated_at);

    // 2) 방번호에 맞는 메세지 찾기
    Page<Message> findAllByChatJoin_ChatRoom_Id(long roomId, Pageable pageable);


}
