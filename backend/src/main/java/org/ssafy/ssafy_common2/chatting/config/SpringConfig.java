package org.ssafy.ssafy_common2.chatting.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class SpringConfig implements WebSocketMessageBrokerConfigurer {



    // 1) 웹 소켓 주소
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/ws-stomp")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    // 2) 웹소켓의 Pub와 Sub 주소
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 메세지를 구독하는 요청URL
        // => 즉 메세지를 받고 싶다면 앞에 다음 prefix를 붙이면 되도록 설정함
        registry.enableSimpleBroker("/sub");

        // 메세지를 발행하는 요청 URL
        // => 즉 메세지를 보내고 싶다면 앞에 다음 prefix를 붙이면 되도록 설정함
        registry.setApplicationDestinationPrefixes("/pub");
    }

    // 3) 웹소켓으로 보내는 메세지의 최대 크기 설정
    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setMessageSizeLimit(1024*1024*1024);
    }

    // 3) 웹소켓으로 보내는 메세지의 최대 크기 설정
    @Bean
    public ServletServerContainerFactoryBean createServletContainerFactoryBean() {

        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxTextMessageBufferSize(Integer.MAX_VALUE);
        container.setMaxBinaryMessageBufferSize(Integer.MAX_VALUE);

        return container;
    }


}
