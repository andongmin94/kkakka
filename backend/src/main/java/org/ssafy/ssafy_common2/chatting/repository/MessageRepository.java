package org.ssafy.ssafy_common2.chatting.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2.chatting.entity.Message;
@Transactional
public interface MessageRepository extends JpaRepository<Message,Long> {

    @Modifying
    @Query(value = "insert into message(content, message_type, user_id, chat_room_id ) " +
            "values (:content, :message_type, :user_id, :chat_room_id )",nativeQuery = true)
    void InsertMessage( @Param("content") String content, @Param("message_type") String message_type,
                       @Param("user_id") long user_id, @Param("chat_room_id") long chat_room_id);
}
