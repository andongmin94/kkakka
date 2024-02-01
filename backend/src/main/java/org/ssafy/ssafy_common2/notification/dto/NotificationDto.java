package org.ssafy.ssafy_common2.notification.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ssafy.ssafy_common2.notification.entity.Notification;
import org.ssafy.ssafy_common2.notification.entity.NotificationType;
import org.ssafy.ssafy_common2.user.entity.User;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class NotificationDto {

    private User receiver;
    private NotificationType notificationType;
    private String alarmContent;
    private String alarmPic;
    private String frqEmail;
    private Long relatedContentId;

    @Builder
    private NotificationDto(User receiver, NotificationType notificationType, String alarmContent, String alarmPic,  String frqEmail, Long relatedContentId) {
        this.receiver = receiver;
        this.notificationType = notificationType;
        this.alarmContent = alarmContent;
        this.alarmPic = alarmPic;
        this.frqEmail = frqEmail;
        this.relatedContentId = relatedContentId;
    }

    public static NotificationDto of(User receiver, NotificationType notificationType, String alarmContent, String alarmPic, String frqEmail, Long relatedContentId){
        return builder()
                .receiver(receiver)
                .notificationType(notificationType)
                .alarmContent(alarmContent)
                .alarmPic(alarmPic)
                .frqEmail(frqEmail)
                .relatedContentId(relatedContentId)
                .build();
    }


    public Notification toEntity() {
        return Notification.of(receiver, notificationType, alarmContent, alarmPic, frqEmail, relatedContentId);
    }


}
