package org.ssafy.ssafy_common2.chatting.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class SpringConfig implements WebSocketMessageBrokerConfigurer {



    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/ws-stomp")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 메세지를 구독하는 요청URL
        // => 즉 메세지를 받고 싶다면 앞에 다음 prefix를 붙이면 되도록 설정함
        registry.enableSimpleBroker("/sub");

        // 메세지를 발행하는 요청 URL
        // => 즉 메세지를 보내고 싶다면 앞에 다음 prefix를 붙이면 되도록 설정함
        registry.setApplicationDestinationPrefixes("/pub");
    }


}
