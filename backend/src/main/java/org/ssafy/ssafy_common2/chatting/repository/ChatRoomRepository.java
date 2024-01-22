package org.ssafy.ssafy_common2.chatting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.chatting.entity.Massage;

public interface ChatRoomRepository extends JpaRepository<Massage,Long> {
}
