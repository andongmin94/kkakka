package org.ssafy.ssafy_common2.chatting.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.ssafy_common2.chatting.entity.Message;
import org.ssafy.ssafy_common2.chatting.service.ChatRoomMySQLService;
import org.ssafy.ssafy_common2.chatting.service.ChatRoomRedisService;
import org.ssafy.ssafy_common2.chatting.service.ChatService;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ChatController {
    private ChatService chatService;

    // 1) TALK 타입 메세지가 WebSocket으로 발행되는 경우, 전처리기 STOMP Handler를 거친 후 실행된다.
    @MessageMapping("/chat/message")
    public void message (Message message) {
        chatService.sendChatMessage(message);
    }
}
