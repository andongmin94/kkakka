package org.ssafy.ssafy_common2.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.ssafy.ssafy_common2.user.entity.FriendList;
import org.ssafy.ssafy_common2.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface FriendListRepository extends JpaRepository<FriendList,Long> {

    Optional<FriendList> findBySenderAndReceiverAndDeletedAtIsNull(User sender, User receiver);

    @Query("select fl.sender from FriendList fl " +
            "where fl.sender in (select f.receiver from FriendList f where f.sender=:user and f.isCheck=true and f.deletedAt is null) " +
            "and fl.receiver=:user and fl.isCheck=true and fl.deletedAt is null")
    List<User> findFriendsByUser(@Param("user") User user);

    List<FriendList> findAllBySenderAndIsCheckAndDeletedAtIsNull(User sender, boolean b);
}
