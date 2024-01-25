package org.ssafy.ssafy_common2.chatting.config.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.ssafy.ssafy_common2._common.jwt.JwtUtil;
import org.ssafy.ssafy_common2.chatting.service.ChatRoomRedisService;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final JwtUtil jwtUtil;
    private final ChatRoomRedisService chatRoomRedisService;

    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        return null;
    }

}
