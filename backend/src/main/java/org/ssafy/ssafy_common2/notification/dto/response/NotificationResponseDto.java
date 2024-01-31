package org.ssafy.ssafy_common2.notification.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ssafy.ssafy_common2.notification.entity.Notification;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class NotificationResponseDto {

    private Long alarmId;
    private String alarmContent;
    private String alarmPic;
    private Boolean isChecked;
    private LocalDateTime createdAt;
    private String frqEmail;
    private Long relatedContentId;

    @Builder
    private NotificationResponseDto(Long alarmId, String alarmContent, String alarmPic, Boolean isChecked, LocalDateTime createdAt, String frqEmail, Long relatedContentId) {
        this.alarmId = alarmId;
        this.alarmContent = alarmContent;
        this.alarmPic = alarmPic;
        this.isChecked = isChecked;
        this.createdAt = createdAt;
        this.frqEmail = frqEmail;
        this.relatedContentId = relatedContentId;
    }

    public static NotificationResponseDto of(Notification notification) {

        return builder()
                .alarmId(notification.getId())
                .alarmContent(notification.getNotiContent())
                .alarmPic(notification.getRelatedImg())
                .isChecked(notification.getIsChecked())
                .createdAt(notification.getCreatedAt())
                .frqEmail(notification.getRelatedEmail())
                .relatedContentId(notification.getRelatedContentId())
                .build();
    }
}
