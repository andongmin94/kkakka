package org.ssafy.ssafy_common2.notification.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NotificationListResponseDto {

    private List<NotificationResponseDto> alarmList;
    private int numOfUncheckedAlarm;

    @Builder
    private NotificationListResponseDto(List<NotificationResponseDto> alarmList, int numOfUncheckedAlarm) {
        this.alarmList = alarmList;
        this.numOfUncheckedAlarm = numOfUncheckedAlarm;
    }

    public static NotificationListResponseDto from(List<NotificationResponseDto> notificationResponseDtos) {
        return builder()
                .alarmList(notificationResponseDtos)
                .numOfUncheckedAlarm(notificationResponseDtos.size())
                .build();
    }
}
