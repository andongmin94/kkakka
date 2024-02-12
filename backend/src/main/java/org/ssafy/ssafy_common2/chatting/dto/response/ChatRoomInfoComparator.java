package org.ssafy.ssafy_common2.chatting.dto.response;

import lombok.extern.slf4j.Slf4j;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;


// 채팅방을 메세지 보낸 시간 순으로 정렬하기
public class ChatRoomInfoComparator implements Comparator<ChatRoomInfoDto> {



    @Override
    public int compare(ChatRoomInfoDto o1, ChatRoomInfoDto o2) {

        if(o1.getLastWrittenMessageTime() == null && o2.getLastWrittenMessageTime() == null){
            return  0;
        }

        if(o1.getLastWrittenMessageTime() == null) {
            return 1;
        }

        if(o2.getLastWrittenMessageTime() == null) {
            return -1;
        }

        if(o1.getLastWrittenMessageTime().isEqual(o2.getLastWrittenMessageTime())){

            LocalTime A = o1.getLastWrittenMessageTime().toLocalTime();
            LocalTime B = o2.getLastWrittenMessageTime().toLocalTime();

            return -( A.truncatedTo(ChronoUnit.MINUTES).compareTo(B.truncatedTo(ChronoUnit.MINUTES)));

        }

        return -(o1.getLastWrittenMessageTime().compareTo(o2.getLastWrittenMessageTime()));
    }
}
