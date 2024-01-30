package org.ssafy.ssafy_common2;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EnableJpaAuditing
public class SsafyCommon2Application {

	@RequestMapping("/hello")
	String hello() {
		return "Hello World!";
	}
	public static void main(String[] args) {
		SpringApplication.run(SsafyCommon2Application.class, args);
	}

}
