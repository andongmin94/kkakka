package org.ssafy.ssafy_common2.chatting.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;


/* 스케줄러 Config가 필요한 이유: 스프링은 기본적으로 싱글 스레드이기 때문에 스케줄러 실행이 겹칠 경우,
어느 한쪽은 제 시간에 실행되지 않는다. 따라서 멀티 스레드 설정을 해서 겹쳐도 동시에 돌아가도록 처리해야한다. */
@Configuration
// 0) SchedulingConfiguerer는 @EnableScheduling이 걸린 @Confogiration에 사용될 용도로 만들어진 인터페이스
//    TaskScheduler를 등록하기 위한 용도로 주로 쓰임.
public class SchedulerConfig implements SchedulingConfigurer {

    // 1) 멀티 스레드 개수
    private final static int POOL_SIZE = 10;
    @Override
    // 2) ScheduledTaskRegistrar는 스케줄된 작업에 대한 전반적인 관리(cron, fixedDelay, fixedRate 추가 및 삭제)를 맡는 객체이다.
    //    그 중 setTaskScheduler는 Registrar의 작업 주에서 스케줄된 Task들에 대하여 일을 처리할 TaskScheduler를 선택하게 해주는 매소드다.
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {

        // 3) ThreadPoolTaskScheduler == 테스크 실행 및 스케줄링에 사용되는 스프링 라이브러리
        final ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();

        // 4) threadPoolTaskScheduler 값 설정
        threadPoolTaskScheduler.setPoolSize(POOL_SIZE);
        threadPoolTaskScheduler.setThreadNamePrefix("실행된Thread 이름: ");
        threadPoolTaskScheduler.initialize();


        // 5) 우리 스케줄러에 우리가 설정한 Scheduler 객체를 등록
        taskRegistrar.setTaskScheduler(threadPoolTaskScheduler);
    }
}
