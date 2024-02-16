package org.ssafy.ssafy_common2.chatting.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2.chatting.entity.ChatJoin;

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

    // 5) 사용자 ID와 RoomID로 해당 채팅참여가 진짜 있는지 확인
    @Query(value = "SELECT * FROM chat_join cj WHERE cj.user_id = :userId AND cj.chat_room_id = :chatRoomId AND cj.deleted_at IS NULL "
           , nativeQuery = true)
    Optional<ChatJoin> getChatJoinByUserIdANDByChatRoomIdDAndDeletedAtIsNull(@Param("userId")long userId, @Param("chatRoomId") long chatRoomId);


    // 6) 채팅방 나갈 때, Modified_at 최신화
    @Modifying
    @Transactional
    @Query(value = "UPDATE chat_join cj set cj.updated_at = :now where cj.user_id = :userId and cj.chat_room_id = :chatRoomId", nativeQuery = true)
    void updateChatJoinModifiedAt(@Param("now")LocalDateTime now,@Param("userId") long userId,@Param("chatRoomId") long chatRoomId);

    // 7) userId, roomId로 채팅참여 하나 특정하여 배팅 금액, 어디에 걸었는지 최신화

    @Modifying
    @Query(value = "UPDATE chat_join cj SET cj.is_win = :isWin, cj.bet_price = :betPrice WHERE cj.user_id = :userId AND cj.chat_room_id = :roomId", nativeQuery = true)
    void updateIswinAndBetPrice(@Param("isWin") boolean isWin, @Param("betPrice") int betPrice, @Param("userId") long userId, @Param("roomId") long roomId);

    // 8) 특정 채팅방에 참여한 사람들 전부 찾기
    List<ChatJoin> findChatJoinByChatJoinId_ChatRoomId(long roomId);

    // 9) 둘 사이에 1대1 채팅방이 있는지 확인
    @Query(value = "SELECT  cj1.chat_room_id "
            +"from chat_join cj1  "
            +"JOIN chat_join cj2  "
            +"ON cj1.chat_room_id = cj2.chat_room_id "
            +"AND cj1.deleted_at is null "
            +"AND cj2.deleted_at is null "
            +"AND cj1.user_id = :user1 "
            +"AND cj2.user_id = :user2 "
            +"AND cj1.chat_room_id NOT IN (SELECT cr.id FROM chat_room cr WHERE cr.chat_room_type = 'MANY') "
            +"GROUP BY cj1.chat_room_id "
            +"order by cj1.chat_room_id ", nativeQuery = true)
    Optional<Long> checkUserConnectedOneByOneRoom(long user1, long user2);




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
