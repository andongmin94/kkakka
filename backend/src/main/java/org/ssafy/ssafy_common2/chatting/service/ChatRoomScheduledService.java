package org.ssafy.ssafy_common2.chatting.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2._common.exception.ErrorResponse;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;
import org.ssafy.ssafy_common2.chatting.repository.ChatRoomRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatRoomScheduledService {

//    private final ChatRoomRepository chatRoomRepository;
//
//    // 1) 중계방 중에서 10분이 넘은 중계방은 더 이상 베팅을 하지 못하도록 닫는다. (일단 1분으로 설정 확인하려고)
//    @Scheduled(fixedDelay = 60000)
//    public void checkBroadCastRoom() {
//
//        log.info("현재시간은 {} 이고 중계방 중 10분이 지난 중게방이 있다면 베팅을 비활성화 합니다.", LocalDateTime.now());
//        // 1-1) 모든 죽지 않은 MANY 중계방 조회
//        List<ChatRoom> broadCastList = chatRoomRepository.findAllByChatRoomTypeAndTenMinuteIsFalseAndDeletedAtIsNull(ChatRoom.ChatRoomType.MANY).orElse(null);
//
//        // 1-2) 중계방이 하나라도 파져 있다면,
//        if( broadCastList != null){
//            for (int i = 0; i < broadCastList.size(); i++) {
//                ChatRoom cr = broadCastList.get(i);
//
//                LocalDateTime chatRoomCreatedTime = cr.getCreatedAt();
//
//                // 중계방이 현재시각에서 10분 뺀 것보다 작으면(더 이전이면)
//                if(chatRoomCreatedTime.compareTo(LocalDateTime.now().minusMinutes(10)) <= 0){
//                    chatRoomRepository.updateIsTenMinute(cr.getId());
//
//                    int winPoint = cr.getWinPoint();
//                    int losePoint = cr.getLosePoint();
//
//                    double WinSuccessPercent = 0;
//                    double loseSuccessPercent = 0;
//
//                    if(winPoint != 0){
//                        WinSuccessPercent = winPoint/(winPoint + losePoint);
//                    }
//                    if(losePoint != 0) {
//                        loseSuccessPercent =losePoint/(winPoint + losePoint);
//                    }
//
//
//
//                    log.info("{}번 중계방의 배당률을 계산합니다... 실시간 플레이어가 승리한다팀의 배당률은 {} 이고, ", broadCastList.get(i).getId(), WinSuccessPercent);
//                    log.info("플레이어가 패배한다팀의 배당률은 {} 입니다. ", loseSuccessPercent);
//
//                }
//            }
//        }
//    }
//
//
//    // 2) 만들어진지 90분이 넘은 중계방은 삭제한다. (일단 6분으로 설정 확인하려고)
//
//    @Scheduled(fixedDelay = 60000)
//    @Transactional
//    public void deleteBroadcastRoom(){
//
//        log.info("현재시간은 {} 이고 중계방 중 1시간이 지난 중게방이 있다면 삭제합니다.", LocalDateTime.now());
//
//        // 1-1) 모든 중계방 조회
//        List<ChatRoom> broadCastList = chatRoomRepository.findChatRoomByChatRoomTypeAndDeletedAtIsNull(ChatRoom.ChatRoomType.MANY);
//
//        // 1-2) 중계방이 하나라도 파져 있다면,
//        if( broadCastList != null){
//            for (int i = 0; i < broadCastList.size(); i++) {
//                ChatRoom cr = broadCastList.get(i);
//                LocalDateTime chatRoomCreatedTime = cr.getCreatedAt();
//
//                // 중계방이 현재시각에서 10분 뺀 것보다 작으면(더 이전이면)
//                if(chatRoomCreatedTime.compareTo(LocalDateTime.now().minusMinutes(90)) <= 0){
//                    chatRoomRepository.deleteChatRoomById(cr.getId(), LocalDateTime.now());
//                }
//            }
//        }
//
//    }


}
