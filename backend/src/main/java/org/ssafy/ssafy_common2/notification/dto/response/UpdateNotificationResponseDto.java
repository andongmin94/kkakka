package org.ssafy.ssafy_common2.notification.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class UpdateNotificationResponseDto {

    private int numOfUncheckedAlarm;

    @Builder
    private UpdateNotificationResponseDto(int numOfUncheckedAlarm) {
        this.numOfUncheckedAlarm = numOfUncheckedAlarm;
    }

    public static UpdateNotificationResponseDto of(int numOfUncheckedAlarm) {
        return builder()
                .numOfUncheckedAlarm(numOfUncheckedAlarm)
                .build();
    }
}
