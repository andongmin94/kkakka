package org.ssafy.ssafy_common2;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EnableJpaAuditing // 엔티티 생성 수정 시각 자동으로 기록
@EnableScheduling  // 스케줄러 추가
@EnableAsync      //  같은 Thread 내의 여러 작업이 비동기적으로 실행되도록
public class SsafyCommon2Application {

	@RequestMapping("/api/hello")
	String hello() {
		return "Hello World!";
	}
	public static void main(String[] args) {
		SpringApplication.run(SsafyCommon2Application.class, args);
	}

}
