package org.ssafy.ssafy_common2.notification.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NotificationListResponseDto {

    private List<NotificationResponseDto> alarmList;
    private int numOfUncheckedAlarm;
    private String lastNotiEventId;

    @Builder
    private NotificationListResponseDto(List<NotificationResponseDto> alarmList, int numOfUncheckedAlarm, String lastNotiEventId) {
        this.alarmList = alarmList;
        this.numOfUncheckedAlarm = numOfUncheckedAlarm;
        this.lastNotiEventId = lastNotiEventId;
    }

    public static NotificationListResponseDto from(List<NotificationResponseDto> notificationResponseDtos, String lastNotiEventId) {
        return builder()
                .alarmList(notificationResponseDtos)
                .numOfUncheckedAlarm(notificationResponseDtos.size())
                .lastNotiEventId(lastNotiEventId)
                .build();
    }
}
