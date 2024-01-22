package org.ssafy.ssafy_common2.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.user.entity.Alias;
import org.ssafy.ssafy_common2.user.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification,Long> {
}
