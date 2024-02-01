package org.ssafy.ssafy_common2.notification.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.notification.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification,Long> {
}
