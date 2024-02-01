package org.ssafy.ssafy_common2.notification.service;


import io.netty.util.internal.StringUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2.notification.dto.NotificationDto;
import org.ssafy.ssafy_common2.notification.dto.response.NotificationListResponseDto;
import org.ssafy.ssafy_common2.notification.dto.response.NotificationResponseDto;
import org.ssafy.ssafy_common2.notification.dto.response.UpdateNotificationResponseDto;
import org.ssafy.ssafy_common2.notification.entity.Notification;
import org.ssafy.ssafy_common2.notification.entity.NotificationType;
import org.ssafy.ssafy_common2.notification.repository.EmitterRepository;
import org.ssafy.ssafy_common2.notification.repository.NotificationRepository;
import org.ssafy.ssafy_common2.user.entity.User;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private static final Long DEFAULT_TIMEOUT = 1000L * 60 * 60;

    private final EmitterRepository emitterRepository;
    private final NotificationRepository notificationRepository;

    // 알림 구독
    public SseEmitter subscribe(String username, String lastEventId) {

        String emitterId = createIdByUserEmailAndTime(username);
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

        // 더미 데이터 전송 (503 에러 방지)
        String eventId = createIdByUserEmailAndTime(username);
        sendNotification(emitter, eventId, emitterId, "EventStream 생성 [user: " + username + "]");

        // 클라이언트 미수신 Event 목록이 있을 경우, 전송하여 Event 유실 예방
        if(hasLostData(lastEventId)){
            Map<String, Object> eventCaches = emitterRepository.findAllEventCacheStartWithByUserEmail(String.valueOf(username));
            eventCaches.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> {
                        sendNotification(emitter, entry.getKey(), emitterId, entry.getValue());
                    });
        }

        return emitter;
    }

    // 알림 전송(DB저장 및 emitter 전송 요청)
    @Transactional
    public void send(NotificationDto notificationDto) {

        Notification notification = notificationRepository.save(notificationDto.toEntity());
        NotificationResponseDto responseDto = NotificationResponseDto.of(notification);

        // receiver 사용자의 Emitter 찾기
        String receiverEmail = notificationDto.getReceiver().getKakaoEmail();
        String eventId = createIdByUserEmailAndTime(receiverEmail);
        Map<String, SseEmitter> emitters = emitterRepository.findAllEmitterStartWithByUserEmail(receiverEmail);

        emitterRepository.saveEventCache(eventId, responseDto);

        // 사용자의 Emitter에 알림 전송
        emitters.forEach(
                (key, emitter) -> {
                    sendNotification(emitter, eventId, key, responseDto);
                }
        );

    }

    // 알림 리스트 불러오기
    public NotificationListResponseDto getNoficiationList(User user) {

        NotificationListResponseDto responseDto = NotificationListResponseDto.from(
                notificationRepository.findAllByUserAndIsCheckedIsFalseAndDeletedAtIsNull(user).stream()
                .map(NotificationResponseDto::of).toList()
        );

        return responseDto;

    }

    @Transactional
    public UpdateNotificationResponseDto readAlarm(Long alarmId, User user) {

        Notification notification = notificationRepository.findByIdAndUser(alarmId, user)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_ALARM));

        notification.updateIsChecked(true);

        return UpdateNotificationResponseDto.of(getNumOfUncheckedAlarm(user));
    }

    // 안 읽은 알람 갯수
    public int getNumOfUncheckedAlarm(User user) {

        return notificationRepository.countByUserAndIsCheckedIsFalseAndDeletedAtIsNull(user);
    }

    // 받지 않은 이벤트가 있는지 확인
    private boolean hasLostData(String lastEventId){
        return !lastEventId.isEmpty();
    }

    // emitter에게 알림 전송 요청
    private void sendNotification(SseEmitter emitter, String eventId, String emitterId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(eventId)
                    .name("sse")
//                    .reconnectTime(1000L) // 재연결 시도
                    .data(data));

            System.out.println("last-event-id : " +eventId);
        } catch (IOException exception) {
            // 클라이언트와의 연결이 끊긴 경우, emitter를 만료시킨다.
            emitter.complete();
            emitterRepository.deleteById(emitterId);
        }
    }

    private String createIdByUserEmailAndTime(String email) {
        return String.format("%s_%s", email, System.currentTimeMillis());
    }

}
