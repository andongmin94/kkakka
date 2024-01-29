package org.ssafy.ssafy_common2.chatting.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.ssafy.ssafy_common2.chatting.entity.Message;
import org.ssafy.ssafy_common2.chatting.service.ChatRoomMySQLService;
import org.ssafy.ssafy_common2.chatting.service.ChatRoomRedisService;
import org.ssafy.ssafy_common2.chatting.service.ChatService;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatController {
    private ChatService chatService;
    private ChatRoomMySQLService chatRoomMySQLService;

    private final SimpMessageSendingOperations template;


    // 1) 입장 메세지 용

    @MessageMapping("/chat/user")
    public void enterUser(@Payload Message msg, SimpMessageHeaderAccessor headerAccessor) {

        // 채팅방 유저 +1
        chatRoomMySQLService.updateUserCnt(msg.getChatJoin().getChatRoom().getId(), "PLUS");

        headerAccessor.getSessionAttributes().put("userUUID", "전수민");
        headerAccessor.getSessionAttributes().put("roomId", msg.getChatJoin().getChatRoom().getId());

        msg.setContent(msg.getId() + "님이 입장 하셨습니다!");
        template.convertAndSend("/sub/chat/room"+ msg.getChatJoin().getChatRoom().getId(), msg);
    }


    // 2) TALK 타입 메세지가 WebSocket으로 발행되는 경우, 전처리기 STOMP Handler를 거친 후 실행된다.
    @MessageMapping("/chat/sendMessage")
    public void sendMessage (@Payload Message msg) {
        log.info("MESSAGE {}", msg);

        msg.setContent(msg.getContent());

        template.convertAndSend("/sub/chat/room" + msg.getChatJoin().getChatRoom().getId(), msg);
    }

    @EventListener
    public void webSocketDisconnectListener(SessionDisconnectEvent event) {
        log.info("DisConnEvent {}", event);

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        log.info("headAccessor {}", headerAccessor);
    }
}
