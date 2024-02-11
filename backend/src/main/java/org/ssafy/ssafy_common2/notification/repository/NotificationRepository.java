package org.ssafy.ssafy_common2.notification.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.notification.entity.Notification;
import org.ssafy.ssafy_common2.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification,Long> {

    List<Notification> findAllByUserAndIsCheckedIsFalseAndDeletedAtIsNullOrderByCreatedAtDesc(User user);

    // user의 읽지 않은 알림의 수
    Integer countByUserAndIsCheckedIsFalseAndDeletedAtIsNull(User user);

    Optional<Notification> findByIdAndUser(Long id, User user);


}
