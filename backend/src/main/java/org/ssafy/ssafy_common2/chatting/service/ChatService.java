package org.ssafy.ssafy_common2.chatting.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2.chatting.entity.Message;

@RequiredArgsConstructor
@Service
public class ChatService {

    private final ChannelTopic channelTopic;
    private final RedisTemplate redisTemplate;


    // 1) STOMP의 Header Meta Data인 Destination에서 RoomId를 추출
    public long getRoomId(String destination) {
        int lastIndex = destination.lastIndexOf('/');

        // 1-1) lastIndexOf는 우리가 찾는 문자가 문자열 내에 없다면 -1을 뱉는다.
        if(lastIndex != -1){

            // 만약 '/' 이 있다면 우리는 그것 이후부터 잘라서 온다.
            // 그러니까 destination의 chat/room/{방번호} 이므로 여기서 {방번호}만 떼서 오는 것이다.
            return Long.parseLong(destination.substring(lastIndex +1));
        }else {
            return -1;
        }
    }


    // 2) 채팅방에 메세지 발송
    public void sendChatMessage(Message message) {

        // 2-1) 입장과 퇴장 메세지의 경우 Message 객체의 내용을 변환
        if(Message.MessageType.ENTER.equals(message.getMessageType())) {
            message.setContent(message.getId() + "님이 입장했습니다.");
        } else if (Message.MessageType.QUIT.equals(message.getMessageType())) {
            message.setContent(message.getId() + "님이 퇴장했습니다.");
        }

        // 2-2) 메세지를 Mysql DB에 저장 

        // 2-3) 만약에 메세지 타입이 ENTER이면, 이전 메세지 전부 긁어서 restTemplate.convertAndSend 하기

        // 2-4) 메세지를 Pub 하기
        redisTemplate.convertAndSend(channelTopic.getTopic(), message);

    }
}


/*
* 1) lastIndexOf() 메서드는 (지정된 문자 또는 문자열의 하위 문자열)이 마지막으로 나타나는 위치를 반환
*
* */
