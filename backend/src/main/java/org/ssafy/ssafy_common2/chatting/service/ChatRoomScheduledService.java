package org.ssafy.ssafy_common2.chatting.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2._common.exception.ErrorResponse;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;
import org.ssafy.ssafy_common2.chatting.repository.ChatRoomRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatRoomScheduledService {

    private final ChatRoomRepository chatRoomRepository;

    // 1) 중계방 중에서 10분이 넘은 중계방은 더 이상 베팅을 하지 못하도록 닫는다.
    @Scheduled(fixedDelay = 60000)
    public void checkBroadCastRoom() {

        log.info("현재시간은 {} 이고 중계방 중 10분이 지난 중게방이 있다면 베팅을 비활성화 합니다.", LocalDateTime.now());
        // 1-1) 모든 중계방 조회
        List<ChatRoom> broadCastList = chatRoomRepository.findAllByChatRoomTypeAndTenMinuteIsFalseAndDeletedAtIsNull(ChatRoom.ChatRoomType.MANY).orElse(null);

        // 1-2) 중계방이 하나라도 파져 있다면,
        if( broadCastList != null){
            for (int i = 0; i < broadCastList.size(); i++) {
                ChatRoom cr = broadCastList.get(i);

                LocalDateTime chatRoomCreatedTime = cr.getCreatedAt();

                // 중계방이 현재시각에서 10분 뺀 것보다 작으면(더 이전이면)
                if(chatRoomCreatedTime.compareTo(LocalDateTime.now().minusMinutes(10)) <= 0){
                    chatRoomRepository.updateIsTenMinute(cr.getId());
                }
            }
        }
    }


    // 2) 만들어진지 90분이 넘은 중계방은 삭제한다.

    @Scheduled(fixedDelay = 3600000)
    public void deleteBroadcastRoom(){

        log.info("현재시간은 {} 이고 중계방 중 1시간이 지난 중게방이 있다면 삭제합니다.", LocalDateTime.now());

        // 1-1) 모든 중계방 조회
        List<ChatRoom> broadCastList = chatRoomRepository.findAllByChatRoomTypeAndTenMinuteIsFalseAndDeletedAtIsNull(ChatRoom.ChatRoomType.MANY).orElse(null);

        // 1-2) 중계방이 하나라도 파져 있다면,
        if( broadCastList != null){
            for (int i = 0; i < broadCastList.size(); i++) {
                ChatRoom cr = broadCastList.get(i);

                LocalDateTime chatRoomCreatedTime = cr.getCreatedAt();

                // 중계방이 현재시각에서 10분 뺀 것보다 작으면(더 이전이면)
                if(chatRoomCreatedTime.compareTo(LocalDateTime.now().minusMinutes(90)) <= 0){
                    chatRoomRepository.deleteById(cr.getId());
                }
            }
        }

    }


}
