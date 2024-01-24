package org.ssafy.ssafy_common2.user.repository;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.user.entity.Alias;
import org.ssafy.ssafy_common2.user.entity.FriendList;
import org.ssafy.ssafy_common2.user.entity.User;

import java.util.Optional;

public interface FriendListRepository extends JpaRepository<FriendList,Long> {

    Optional<FriendList> findBySenderAndReceiver(User sender, String receiver);
}
