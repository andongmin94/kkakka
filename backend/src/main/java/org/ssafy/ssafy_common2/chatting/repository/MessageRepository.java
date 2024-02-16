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
    

    // 1) 방번호에 맞는 메세지 찾기
    Page<Message> findAllByChatJoin_ChatRoom_Id(long roomId, Pageable pageable);

    // 2) 내가 참여한 채팅방의 가장 최근 메세지
    Optional<Message> findTopByChatJoin_ChatRoom_IdOrderByCreatedAtDesc(long roomId);


    // 3) 채팅방 수정 일자와 비교하여 안 읽은 메세지 수 뽑기
    @Query(value ="SELECT COUNT(*) FROM message m WHERE m.created_at > (SELECT updated_at from (SELECT * from chat_join cj where cj.chat_room_id = :chatRoomId AND cj.user_id = :userId AND cj.deleted_at is null) temp)  AND  m.chat_join_chat_room_id = :chatRoomId", nativeQuery = true)
    Optional<Integer> getUnreadMessageCnt (@Param("chatRoomId") long chatRoomId, @Param("userId") long userId);

    // 4) 챗봇 메세지만 뽑아내기
    List<Message> findAllByChatJoin_ChatJoinId_ChatRoomIdAndMessageType(
             long chatRoomId, Message.MessageType messageType
    );

    // 5) 특정 시간 이후의 메세지만 뽑아내기
    List<Message> findAllByChatJoin_User_IdAndChatJoin_ChatJoinId_ChatRoomIdAndCreatedAtBefore(
            long usrId, long chatRoomId, LocalDateTime created_at);

}
