package org.ssafy.ssafy_common2;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SsafyCommon2Application {

	public static void main(String[] args) {
		SpringApplication.run(SsafyCommon2Application.class, args);
	}

}
