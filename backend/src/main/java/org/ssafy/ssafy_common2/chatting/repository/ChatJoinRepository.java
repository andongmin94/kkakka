package org.ssafy.ssafy_common2.chatting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.ssafy.ssafy_common2.chatting.entity.ChatJoin;

import java.util.List;

public interface ChatJoinRepository extends JpaRepository<ChatJoin,Long> {

    // 1) 사용자 ID로 해당 사용자가 참여한 채팅방 정보를 전부 보냄
    @Query("SELECT cj FROM ChatJoin cj WHERE cj.chatJoinId.userId = ?1 AND cj.deletedAt is not null")
    List<ChatJoin> findAllByUserIdAndDeletedAtIsNull(long user_id);



}

/*
*  1) @Query 쓴 이유
*     잘은 모르겠지만, 복합키 전부 FK인 경우에, 기본 인터페이스로 못 불러오는 것 같습니다.
*     더 공부해서 최적화 하겠습니다.
* */
