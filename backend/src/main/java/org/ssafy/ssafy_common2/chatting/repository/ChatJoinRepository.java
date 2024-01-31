package org.ssafy.ssafy_common2.chatting.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2.chatting.entity.ChatJoin;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom.ChatRoomType.*;
import org.ssafy.ssafy_common2.chatting.entity.Message;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ChatJoinRepository extends JpaRepository<ChatJoin,Long> {

    // 1) 사용자 ID로 해당 사용자가 참여한 채팅방 정보를 전부 보냄
    @Query("SELECT cj FROM ChatJoin cj WHERE cj.chatJoinId.userId = :user_id AND cj.deletedAt is null")
    List<ChatJoin> findAllByUserIdAndDeletedAtIsNull(@Param("user_id")long user_id);

    // 2)
    @Query(value = "SELECT cr.id " +
            "from chat_room  cr " +
            "WHERE ( cr.chat_owner_email = :ownerEmail AND " +
            "cr.id IN  (SELECT cj.chat_room_id FROM chat_join cj WHERE cj.user_id = :attenderId )) " +
            "AND cr.deleted_at IS NULL " +
            "AND cr.chat_room_type = :chatRoomType ", nativeQuery = true)
    Optional<Long> getUserConnectedRoomIdsAndDeletedAtISNULL (@Param("ownerEmail") String ownerEmail,
                                                        @Param("attenderId") Long attenderId,
                                                        @Param("chatRoomType") String chatRoomType );


    // 3) 내가 참여한 채팅방의 가장 최근 메세지
    @Query(value = "SELECT * FROM message m WHERE 'deleted_at' IS NULL ORDER BY 'created_at' DESC LIMIT 1 ", nativeQuery = true)
    Optional<Message> getLastMessage(long roomId);

    // 4) 채팅방 수정 일자와 비교하여 안 읽은 메세지 수 뽑기
    @Query(value ="SELECT COUNT(*) FROM message m WHERE m.created_at > (SELECT updated_at from (SELECT * from chat_join cj where cj.chat_room_id = :chatRoomId) temp )", nativeQuery = true)
    Optional<Integer> getUnreadMessageCnt (long chatRoomId);


    // 5) 사용자 ID와 RoomID로 해당 채팅참여가 진짜 있는지 확인
    @Query(value = "SELECT * FROM chat_join cj WHERE cj.user_id = :userId AND cj.chat_room_id = :chatRoomId "
           , nativeQuery = true)
    Optional<ChatJoin> getChatJoinByUserIdANDByChatRoomIdDAndDeletedAtIsNull(long userId,long chatRoomId);


    // 6) 채팅방 나갈 때, Modified_at 최신화
    @Modifying
    @Transactional
    @Query(value = "UPDATE chat_join cj set cj.updated_at = :now where cj.user_id = :userId and cj.chat_room_id = :chatRoomId", nativeQuery = true)
    void updateChatJoinModifiedAt(LocalDateTime now, long userId, long chatRoomId);
}

/*
*  1) @Query 쓴 이유
*     잘은 모르겠지만, 복합키 전부 FK인 경우에, 기본 인터페이스로 못 불러오는 것 같습니다.
*     더 공부해서 최적화 하겠습니다.
*
*  2) 특정 Email이 방 주인인 1 대 1 방 혹은 중계방들 중에서,
*     방 번호가 현 유저가 참여한 채팅방의 방 번호 중 하나인 경우 그 방 번호를 출력
*     (이때 삭제일자는 적혀있지 않다.)
* */
