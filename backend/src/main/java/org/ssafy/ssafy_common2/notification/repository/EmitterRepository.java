package org.ssafy.ssafy_common2.notification.repository;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

public interface EmitterRepository {

    SseEmitter save(String emitterId, SseEmitter sseEmitter);
    void saveEventCache(String eventId, Object event);
    Map<String, SseEmitter> findAllEmitter();
    Map<String, SseEmitter> findAllEmitterStartWithByUserEmail(String userEmail);
    Map<String, Object> findAllEventCacheStartWithByUserEmail(String userEmail);
    void deleteById(String id);
    void deleteAllEmitterStartWithUserEmail(String userEmail);
    void deleteAllEventCacheStartWithId(String userEmail);
}
