package org.ssafy.ssafy_common2.chatting.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.ssafy.ssafy_common2.chatting.entity.ChatJoin;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom.ChatRoomType.*;

import java.util.List;
import java.util.Optional;

public interface ChatJoinRepository extends JpaRepository<ChatJoin,Long> {

    // 1) 사용자 ID로 해당 사용자가 참여한 채팅방 정보를 전부 보냄
    @Query("SELECT cj FROM ChatJoin cj WHERE cj.chatJoinId.userId = ?1 AND cj.deletedAt is not null")
    List<ChatJoin> findAllByUserIdAndDeletedAtIsNull(long user_id);

    // 2)
    @Query(value = "SELECT cr.id " +
            "from chat_room  cr " +
            "WHERE ( cr.chat_owner_email = :ownerEmail AND " +
            "cr.id IN  (SELECT cj.chat_room_id FROM chat_join cj WHERE cj.user_id = :attenderId )) " +
            "AND cr.deleted_at IS NULL " +
            "AND cr.chat_room_type = 'ONE'", nativeQuery = true)
    Optional<Long> getUserConnectedRoomIdsAndDeletedAtISNULL (@Param("ownerEmail") String ownerEmail,
                                                        @Param("attenderId") Long attenderId);


}

/*
*  1) @Query 쓴 이유
*     잘은 모르겠지만, 복합키 전부 FK인 경우에, 기본 인터페이스로 못 불러오는 것 같습니다.
*     더 공부해서 최적화 하겠습니다.
*
*  2) 특정 Email이 방 주인인 1 대 1방들 중에서,
*     방 번호가 현 유저가 참여한 채팅방의 방 번호 중 하나인 경우만
*     뽑아서 List 화
*     (이때 삭제일자는 적혀있지 않다.)
* */
