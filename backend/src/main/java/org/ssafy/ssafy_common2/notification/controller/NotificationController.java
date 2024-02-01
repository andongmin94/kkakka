package org.ssafy.ssafy_common2.notification.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.notification.dto.response.NotificationListResponseDto;
import org.ssafy.ssafy_common2.notification.dto.response.UpdateNotificationResponseDto;
import org.ssafy.ssafy_common2.notification.service.NotificationService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping(value = "/alarm/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                @RequestHeader(value="Last-Event-Id", required = false, defaultValue = "") String lastEventId) {

        return notificationService.subscribe(userDetails.getUsername(), lastEventId);
    }

    @GetMapping("/alarm")
    public ApiResponseDto<NotificationListResponseDto> getAlarmAll(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        return ResponseUtils.ok(notificationService.getNoficiationList(userDetails.getUser()), MsgType.SEARCH_SUCCESSFULLY);
    }

    @PutMapping("/alarm/{alarm-id}")
    public ApiResponseDto<UpdateNotificationResponseDto> readAlarm(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                   @PathVariable("alarm-id") Long alarmId) {

        return ResponseUtils.ok(notificationService.readAlarm(alarmId, userDetails.getUser()), MsgType.UPDATE_ALARM_SUCCESSFULLY);
    }


}
