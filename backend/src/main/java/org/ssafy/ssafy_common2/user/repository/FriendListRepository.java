package org.ssafy.ssafy_common2.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.ssafy.ssafy_common2.user.entity.FriendList;
import org.ssafy.ssafy_common2.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface FriendListRepository extends JpaRepository<FriendList,Long> {

    Optional<FriendList> findBySenderAndReceiverAndDeletedAtIsNull(User sender, String receiver);

    @Query("select fl.receiver from FriendList fl " +
            "where fl.receiver in " +
                "(select u.kakaoEmail " +
                "from User u join FriendList f " +
                "on (f.sender.id = u.id) " +
                "where f.receiver=:#{#user.kakaoEmail} and f.isCheck=true) " +
            "and fl.sender=:user and fl.isCheck=true")
    List<String> findFriendEmailsByUser(@Param("user") User user);

    List<FriendList> findAllBySenderOrReceiverAndIsCheck(User sender, User receiver, boolean b);
}
