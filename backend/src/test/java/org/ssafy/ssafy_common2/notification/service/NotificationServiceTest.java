package org.ssafy.ssafy_common2.notification.service;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.ssafy.ssafy_common2.notification.dto.response.NotificationListResponseDto;
import org.ssafy.ssafy_common2.notification.dto.response.UpdateNotificationResponseDto;
import org.ssafy.ssafy_common2.notification.entity.Notification;
import org.ssafy.ssafy_common2.notification.entity.NotificationType;
import org.ssafy.ssafy_common2.notification.repository.EmitterRepository;
import org.ssafy.ssafy_common2.notification.repository.NotificationRepository;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class NotificationServiceTest {
    private NotificationService notificationService;

    private EmitterRepository emitterRepository;
    private NotificationRepository notificationRepository;
    private DynamicUserInfoRepository dynamicUserInfoRepository;

    private User user;
    private DynamicUserInfo userInfo;

    @BeforeEach
    void setup() {
        emitterRepository = mock(EmitterRepository.class);
        notificationRepository = mock(NotificationRepository.class);
        dynamicUserInfoRepository = mock(DynamicUserInfoRepository.class);
        notificationService = new NotificationService(emitterRepository, notificationRepository, dynamicUserInfoRepository);
        userInfo = mock(DynamicUserInfo.class);
        user = User.of(100L, "kakaoImg", "username", "kakaoEmail", "User",
                userInfo);
    }

    @Test
    void 알림_구독() {

        // Given
        when(emitterRepository.save(anyString(), any(SseEmitter.class))).thenReturn(new SseEmitter());
        when(emitterRepository.findAllEventCacheStartWithByUserEmail(anyString())).thenReturn(createDummyEvents());

        // When
        SseEmitter emitter = notificationService.subscribe(user);

        // Then
        assertNotNull(emitter);
        verify(emitterRepository, times(1)).save(anyString(), any(SseEmitter.class));
    }

    @Test
    void 알림_리스트_불러오기() {

        // Given
        Notification noti1 = Notification.of(user, NotificationType.NEW_COMMENT, "alarmContent", "alarmPic", "frqEmail", 1L);
        Notification noti2 = Notification.of(user, NotificationType.NEW_COMMENT, "alarmContent", "alarmPic", "frqEmail", 2L);

        when(notificationRepository.findAllByUserAndIsCheckedIsFalseAndDeletedAtIsNullOrderByCreatedAtDesc(user)).thenReturn(List.of(noti1, noti2));
        String lastNotiEventId = "lastNotiEvent";
        user.getUserInfoId().updateLastNotiEventId(lastNotiEventId);

        // When
        NotificationListResponseDto responseDto = notificationService.getNoficiationList(user);

        // Then
        assertEquals(2, responseDto.getAlarmList().size());
    }

    @Test
    void 알림_lastEventId_업데이트 () {

        // Given
        String lastNotiEventId = "lastNotiEvent";

        // When
        notificationService.updateLastEventId(user, lastNotiEventId);

        // Then
        verify(userInfo).updateLastNotiEventId(lastNotiEventId);
        verify(dynamicUserInfoRepository).save(userInfo);
    }

    @Test
    void 알림_확인() {

        // Given
        Notification noti1 = Notification.of(user, NotificationType.NEW_COMMENT, "alarmContent", "alarmPic", "frqEmail", 1L);
        when(notificationRepository.findByIdAndUser(anyLong(), eq(user))).thenReturn(Optional.of(noti1));

        // When
        UpdateNotificationResponseDto responseDto = notificationService.readAlarm(1L, user);

        // Then
        assertEquals(0, responseDto.getNumOfUncheckedAlarm());
        assertTrue(noti1.getIsChecked()); // 알림 확인

    }

    @Test
    void 안읽은_알림_수() {

        // Given
        when(notificationRepository.countByUserAndIsCheckedIsFalseAndDeletedAtIsNull(user)).thenReturn(2); // Assuming 5 unchecked alarms

        // When
        int numOfUncheckedAlarm = notificationService.getNumOfUncheckedAlarm(user);

        // Then
        assertEquals(2, numOfUncheckedAlarm);
    }


    // 더미 이벤트 캐시
    private Map<String, Object> createDummyEvents() {
        Map<String, Object> events = new HashMap<>();
        events.put("id1", "content1");
        events.put("id2", "content2");

        return events;
    }

}