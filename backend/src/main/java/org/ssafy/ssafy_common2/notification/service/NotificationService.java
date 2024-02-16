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
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private static final Long DEFAULT_TIMEOUT = 1000L * 60 * 60;

    private final EmitterRepository emitterRepository;
    private final NotificationRepository notificationRepository;
    private final DynamicUserInfoRepository dynamicUserInfoRepository;

    // 알림 구독
    public SseEmitter subscribe(User user) {

        // user가 가장 마지막에 확인했던 알람의 id
        String lastEventId = user.getUserInfoId().getLastNotiEventId();
        String userEmail = user.getKakaoEmail();

        // emitter 세팅
        String emitterId = createIdByUserEmailAndTime(userEmail);
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

        // 더미 데이터 전송 (503 에러 방지)
        String eventId = createIdByUserEmailAndTime(userEmail);
        sendNotification(emitter, eventId, emitterId, "EventStream 생성 [user: " + userEmail + "]", "connect");

        // 클라이언트 미수신 Event 목록이 있을 경우, 전송하여 Event 유실 예방
        if(hasLostData(lastEventId)){
            Map<String, Object> eventCaches = emitterRepository.findAllEventCacheStartWithByUserEmail(String.valueOf(userEmail));
            long numOfNewAlarm = eventCaches.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0).count();
            sendNotification(emitter, createIdByUserEmailAndTime(userEmail), emitterId, numOfNewAlarm +"개", "newAlarm");
        }

        return emitter;
    }

    // 알림 전송(DB저장 및 emitter 전송 요청)
    @Transactional
    public void send(NotificationDto notificationDto) {

        // DB에 알림 저장
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
                    sendNotification(emitter, eventId, key, responseDto, "alarm");
                }
        );

    }

    // 알림 리스트 불러오기
    @Transactional
    public NotificationListResponseDto getNoficiationList(User user) {

        NotificationListResponseDto responseDto = NotificationListResponseDto.from(
                notificationRepository.findAllByUserAndIsCheckedIsFalseAndDeletedAtIsNullOrderByCreatedAtDesc(user).stream()
                .map(NotificationResponseDto::of).toList(),
                user.getUserInfoId().getLastNotiEventId()
        );

        return responseDto;

    }

    // 알림 last event id 업데이트
    @Transactional
    public void updateLastEventId(User user, String lastEventId) {

        DynamicUserInfo userInfo = user.getUserInfoId();
        userInfo.updateLastNotiEventId(lastEventId);
        dynamicUserInfoRepository.save(userInfo);
    }

    // 알림 확인
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
        return StringUtils.hasLength(lastEventId);
    }

    // emitter에게 알림 전송 요청
    private void sendNotification(SseEmitter emitter, String eventId, String emitterId, Object data, String alarmName) {
        try {
//            System.out.println("last event id : " + eventId);
            emitter.send(SseEmitter.event()
                    .id(eventId)
                    .name(alarmName)
//                    .reconnectTime(1000L) // 재연결 시도
                    .data(data));

        } catch (IllegalStateException | IOException exception){
            // 클라이언트와의 연결이 끊긴 경우, emitter를 만료시킨다.
            emitter.complete();
            emitterRepository.deleteById(emitterId);
        }
    }

    private String createIdByUserEmailAndTime(String email) {
        return String.format("%s_%s", email, System.currentTimeMillis());
    }

}
