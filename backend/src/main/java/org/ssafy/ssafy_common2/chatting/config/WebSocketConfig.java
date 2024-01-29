package org.ssafy.ssafy_common2.chatting.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.ssafy.ssafy_common2.chatting.config.handler.StompHandler;

@RequiredArgsConstructor
@Configuration
@EnableWebSocketMessageBroker// 0) setting to use STOMP WebSocket
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final StompHandler stompHandler;

    @Override
    public void configureMessageBroker (MessageBrokerRegistry config) {

        // 1) STOMP야 ~ 발행 메세지는 앞에 pub가 붙어~
        config.setApplicationDestinationPrefixes("/pub");

        // 2) STOMP야 ~ 수신할 메세지는 앞에 sub가 붙어~
        config.enableSimpleBroker("/sub");
    }

    // 3) STOMP 웹 소켓이 열리는 장소 설정
    @Override
    public void registerStompEndpoints (StompEndpointRegistry registry) {

        registry.addEndpoint("/ws-stomp").setAllowedOriginPatterns("*")
                .withSockJS();
    }

    // 4) 웹소켓 전처리기 설정
    @Override
    public void configureClientInboundChannel (ChannelRegistration registration){
        registration.interceptors(stompHandler);
    }


}

/*
*
* 3) stomp websocket의 주소 endpoint를 "/ws-stomp"로 설정
*    따라서 로컬에서 웹소켓의 주소는 ws://localhost:8080/ws-stomp가 된다.
*    모든 접근을 허용했고, JS의 WebSocket 라이브러리인 SockJS도 연결 가능하도록 했다.
* */
