package org.ssafy.ssafy_common2.notification.repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
public class EmitterRepositoryImpl implements EmitterRepository {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Map<String, Object> eventCache = new ConcurrentHashMap<>();

    // SSE 이벤트 전송 객체 저장
    @Override
    public SseEmitter save(String emitterId, SseEmitter sseEmitter) {

        emitters.put(emitterId, sseEmitter);
        return sseEmitter;
    }

    // 이벤트 캐시 아이디와 이벤트 객체를 받아서 저장
    @Override
    public void saveEventCache(String eventId, Object event) {

        eventCache.put(eventId, event);
    }

    @Override
    public Map<String, SseEmitter> findAllEmitter() {
        return emitters;
    }

    // 주어진 email로 시작하는 모든 Emitter들을 가져온다.
    @Override
    public Map<String, SseEmitter> findAllEmitterStartWithByUserEmail(String userEmail) {
        return emitters.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(userEmail))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    @Override
    public Map<String, Object> findAllEventCacheStartWithByUserEmail(String userEmail) {
        return eventCache.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(userEmail))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    // 삭제
    @Override
    public void deleteById(String id) {

        emitters.remove(id);
    }

    // 해당 회원과 관련된 모든 Emitter를 지움.
    @Override
    public void deleteAllEmitterStartWithUserEmail(String userEmail) {

        emitters.forEach(
                (key, emitter) -> {
                    if (key.startsWith(userEmail)) {
                        emitters.remove(key);
                    }
                }
        );
    }

    // 해당 회원과 관련된 모든 이벤트를 지움.
    @Override
    public void deleteAllEventCacheStartWithId(String userEmail) {

        eventCache.forEach(
                (key, emitter) -> {
                    if (key.startsWith(userEmail)) {
                        emitters.remove(key);
                    }
                }
        );
    }
}
