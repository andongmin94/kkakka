package org.ssafy.ssafy_common2.chatting.config.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.ssafy.ssafy_common2._common.jwt.JwtUtil;
import org.ssafy.ssafy_common2.chatting.service.ChatRoomRedisService;
import org.ssafy.ssafy_common2.chatting.service.ChatService;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final JwtUtil jwtUtil;
    private final ChatRoomRedisService chatRoomRedisService;
    private final ChatService chatService;

    // 1) WebSocket으로 들어온 메세지 전송 요청이 처리 되기 전에 실행
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        // 1-1)
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        // 1-2) webSocket 연결 시
        if(StompCommand.CONNECT == accessor.getCommand()) {
            System.out.println("++++++++++++++++++++++++연결 완료++++++++++++++++++++++++++");
        }

        // 1-3) 특정 채팅방 들어가겠다는 요청 시
        else if (StompCommand.SUBSCRIBE == accessor.getCommand()) {

            System.out.println("===================메세지 Header에 든 내용들:" + message.getHeaders().entrySet());

            //1-3-a) 헤더에서 구독 Destination 정보를 얻고, 거기서 roomId를 추출한다.
            String roomId = chatService.getRoomId(
                    Optional.ofNullable(
                            (String) message.getHeaders().get("simpDestination")
                    ).orElse("InvalidRoomId"));



        }


        return null;
    }

}

/*
  1-1)
* STOMP는 HTTP와는 다른 자신만의 규격인 STOMP FRAME 을 가지고 있다.
  StompHeaderAccessor 는 해당 STOMP FRAME 에서 메세지를 추출하거나, 메세지를 STOMP FRAME 으로 만드는데 사용
  StompHeaderAccessor 객체는 존재하는 메세지를 wrap 이란 매소드로 감싸서 바로 사용할 수 있다.


*
* */
