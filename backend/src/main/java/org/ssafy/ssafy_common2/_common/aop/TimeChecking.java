package org.ssafy.ssafy_common2._common.aop;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
@Slf4j
public class TimeChecking {
    private long beforeTime = 0L;
    private long afterTime = 0L;

    // 해당 경로의 모든 메서드 실행시 aop 동작, nochecking annotation을 해당 경로의 메서드에 추가시 aop 동작x
    @Before("execution(* org..service..*(..))")
    public void beforeMethod() {
        beforeTime = System.currentTimeMillis();
        log.info("코드 실행 이전");
    }

    @After("execution(* org..service..*(..))")
    public void afterMethod() {
        afterTime = System.currentTimeMillis();
        log.info("코드 실행 시간 = {}", (afterTime - beforeTime));
    }
}
