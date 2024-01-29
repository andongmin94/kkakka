package org.ssafy.ssafy_common2.chatting.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChatService {

    // 1) STOMP의 Header Meta Data인 Destination에서 RoomId를 추출
    public String getRoomId(String destination) {
        int lastIndex = destination.lastIndexOf('/');

        // 1-1) lastIndexOf는 우리가 찾는 문자가 문자열 내에 없다면 -1을 뱉는다.
        if(lastIndex != -1){

            // 만약 '/' 이 있다면 우리는 그것 이후부터 잘라서 온다.
            // 그러니까 destination의 chat/room/{방번호} 이므로 여기서 {방번호}만 떼서 오는 것이다.
            return destination.substring(lastIndex +1);
        }else {
            return "";
        }
    }
}


/*
* 1) lastIndexOf() 메서드는 (지정된 문자 또는 문자열의 하위 문자열)이 마지막으로 나타나는 위치를 반환
*
* */
