package org.ssafy.ssafy_common2.chatting.pubSub;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2.chatting.entity.Message;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber {
    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messagingTemplate;

    // 1)
    public void sendMessage (String publisMessage) {
        try {
            // 1-1) 발행된 메세지를 chatMessage DTO에 맞게 객체 매핑
            Message message = objectMapper.readValue(publisMessage, Message.class);

            System.out.println(message);

            // 1-2) 채팅방을 구독한 클라이언트에게 메세지를 발송
            messagingTemplate.convertAndSend("/sub/chat/room/" + message.getChatJoin().getChatJoinId().getChatRoomId(), message);
        } catch (Exception e) {
            log.error("Exception {}", e);
        }
    }
}


/*
* 1) Redis에서 메세지가 발행(publish)되면 대기하고 있던 대기하고 있던
*    Redis Subscriber가 해당 메세지를 받아서 처리한다.
*
* */
