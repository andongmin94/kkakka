package org.ssafy.ssafy_common2.chatting.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2.chatting.dto.response.BettingDto;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;
import org.ssafy.ssafy_common2.chatting.repository.ChatJoinRepository;
import org.ssafy.ssafy_common2.chatting.repository.ChatRoomRepository;

@Service
@RequiredArgsConstructor
public class BettingService {


    private final ChatRoomRepository chatRoomRepository;
    private  final ChatJoinRepository chatJoinRepository;

    // ** 배팅 서비스 **
    public BettingDto LetsBetting(long userId, long roomId, int BetPoint, boolean isWin){

        // 0) 만약 방이 10분 지났으면 에러 내고 돌려보낸다.
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElse(null);

        if(chatRoom == null){
            return  null;
        }else {

            // 0) 만약 방이 10분 지났으면 에러 내고 돌려보낸다.
            if(chatRoom.isTenMinute()){
                return  null;
            }

            // 1) 배팅 금액을 채팅방에다가 넣는다. 이긴다면 이긴다 point, 지면 진다 point
            else {

            }


            // 2) 현 유저의 채팅 참여에도, 얼마나 걸었는지를 넣는다.

            // 3) 현재까지의 승부 예측 결과를 DTO에 담는다.


        }




        return  null;
    }
}
