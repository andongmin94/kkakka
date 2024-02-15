package org.ssafy.ssafy_common2._common.redis;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;

import java.time.Duration;
import java.util.function.Supplier;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisLockRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public Boolean lock(final String key) {
        return redisTemplate
                .opsForValue()
                //setnx 명령어 사용 - key(key) value("lock")
                .setIfAbsent(generateKey(key), "lock", Duration.ofMillis(3_000));
    }

    public Boolean unlock(final String key) {
        return redisTemplate.delete(generateKey(key));
    }

    private String generateKey(final String key) {
        return key.toString();
    }

    public <T> T runOnLock(String key, Supplier<T> task) {
        while (true) {
            if (!lock(key)) {
                try {
                    log.info("락 획득 실패");
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    throw new CustomException(ErrorType.FAILED_TO_ACQUIRE_LOCK);
                }
            } else {
                log.info("락 획득 성공, lock number : {}", key);
                break;
            }
        }
        try {
            return task.get();
        } finally {
            // Lock 해제
            log.info("락 해제");
            unlock(key);
        }
    }
}
