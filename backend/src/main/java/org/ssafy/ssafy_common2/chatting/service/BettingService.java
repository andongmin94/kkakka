package org.ssafy.ssafy_common2.chatting.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2.chatting.dto.response.BettingDto;
import org.ssafy.ssafy_common2.chatting.dto.response.DividendsDto;
import org.ssafy.ssafy_common2.chatting.dto.response.PredictDto;
import org.ssafy.ssafy_common2.chatting.entity.ChatJoin;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;
import org.ssafy.ssafy_common2.chatting.repository.ChatJoinRepository;
import org.ssafy.ssafy_common2.chatting.repository.ChatRoomRepository;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;

@Service
@RequiredArgsConstructor
public class BettingService {


    private final ChatRoomRepository chatRoomRepository;
    private  final ChatJoinRepository chatJoinRepository;
    private final DynamicUserInfoRepository dynamicUserInfoRepository;


    private BettingDto bettingDto = new BettingDto();

    // ** 배팅 서비스 **
    @Transactional
    public BettingDto LetsBetting(long userId, long roomId, int betPoint, boolean isWin){

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
                PredictDto pd = new PredictDto();
                if(isWin){
                    chatRoomRepository.updateWinPoint(roomId, betPoint + chatRoom.getWinPoint());
                    pd.setPredictWin(betPoint+ chatRoom.getWinPoint());
                    pd.setPredictLose(chatRoom.getLosePoint());

                    // 2) 현 유저의 채팅 참여에도, 얼마나 걸었는지를 넣는다.
                    chatJoinRepository.updateIswinAndBetPrice(isWin, betPoint + chatRoom.getWinPoint(), userId, roomId);

                }else{
                    chatRoomRepository.updateLosePoint(roomId, betPoint + chatRoom.getLosePoint());
                    pd.setPredictWin(chatRoom.getWinPoint());
                    pd.setPredictLose(betPoint + chatRoom.getLosePoint());

                    // 2) 현 유저의 채팅 참여에도, 얼마나 걸었는지를 넣는다.
                    chatJoinRepository.updateIswinAndBetPrice(isWin, betPoint + chatRoom.getLosePoint(), userId, roomId);
                }




                // 3) 현재까지의 승부 예측 결과를 DTO에 담는다.
                bettingDto.setPredictDto(pd);
                bettingDto.setMyBettingPoint(betPoint);
                bettingDto.setMyChosenTeam(isWin? "RED" : "BLUE");

            }

        }

        return  bettingDto;
    }

    // ** 배팅 정산 **
    @Transactional
    public DividendsDto GetBettingResult (User user, long roomId, boolean isWin){
        // 2-1) 채팅방의 총 이긴다 진다 금액 블러오기
      ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElse(null);

        // 2-2) 해당 유저의 배팅 채팅참여 내역
        ChatJoin chatJoin = chatJoinRepository.getChatJoinByUserIdANDByChatRoomIdDAndDeletedAtIsNull(user.getId(), chatRoom.getId()).orElse(null);

        // 2-3) 유저 갱신용에서 진짜 point 꺼내기
        DynamicUserInfo dynamicUserInfo = user.getUserInfoId();
        // 2-4) 배팅 정산
            int userPrevPoint = dynamicUserInfo.getPoint();
            int calculatedPoint;

            // 유저의 예측이 틀렸을 경우, 유저가 건 베팅 머니만큼 돈을 깐다.
            if(chatJoin.isWin() != isWin){
                calculatedPoint = userPrevPoint - chatJoin.getBetPrice();
                dynamicUserInfoRepository.UpdateUserBettingPoint(calculatedPoint, user.getUserInfoId().getId());
            }
            else{
                // 유저의 예측이 들어 맞았을 경우, 유저가 건 배팅 머니만큼 돈을 벌게 한다.
                // 돈 계산 방법: 배팅금액 * (100 + (이긴다 혹은 진다 포인트/ 전체 포인트))

                    // 이긴다 포인트로 포인트 배당
                if(isWin){
                    calculatedPoint = userPrevPoint * (100 + (chatRoom.getWinPoint()/(chatRoom.getWinPoint()+ chatRoom.getLosePoint())));
                }else{
                    calculatedPoint = userPrevPoint * (100 + (chatRoom.getLosePoint()/(chatRoom.getWinPoint()+ chatRoom.getLosePoint())));
                }

                dynamicUserInfoRepository.UpdateUserBettingPoint(calculatedPoint, user.getUserInfoId().getId());
            }

            DividendsDto dto = new DividendsDto();

            dto.setCurUserPoint(calculatedPoint);
            dto.setUserWin(isWin);
            dto.setUserId(user.getId());


        return dto;
    }

}
