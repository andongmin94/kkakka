package org.ssafy.ssafy_common2.chatting.controller;

import io.lettuce.core.dynamic.annotation.Param;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_common2._common.exception.ErrorResponse;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.chatting.dto.response.BettingDto;
import org.ssafy.ssafy_common2.chatting.dto.response.DividendsDto;
import org.ssafy.ssafy_common2.chatting.dto.response.PredictDto;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;
import org.ssafy.ssafy_common2.chatting.entity.Message;
import org.ssafy.ssafy_common2.chatting.repository.ChatJoinRepository;
import org.ssafy.ssafy_common2.chatting.repository.ChatRoomRepository;
import org.ssafy.ssafy_common2.chatting.service.BettingService;
import org.ssafy.ssafy_common2.chatting.service.ChatRoomMySQLService;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/betting/")
public class BettingController {

    private final BettingService bettingService;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;


    // 1) 배팅하기
    @PostMapping("/{room_id}")
    public ApiResponseDto<?> LetsBetting(
            @PathVariable(value = "room_id") long room_id,
            @Param(value = "user_id") long user_id,
            @Param(value = "cur_betting_point") Integer cur_betting_point,
            @Param(value = "is_win") boolean is_win) {

        BettingDto ans = bettingService.LetsBetting( user_id
        , room_id,cur_betting_point, is_win);

        if(ans == null){
            return ResponseUtils.error(ErrorResponse.of(ErrorType.FAILED_TO_BETTING));
        }else {
            return ResponseUtils.ok(ans, MsgType.DATA_SUCCESSFULLY);
        }
    }

    // 2) 배팅 금액 정산 받기
    @PostMapping("/{room_id}/result")
    public ApiResponseDto<?> GetBettingResult(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable(value = "room_id")long room_id,
            @Param(value = "is_win") boolean is_win){

        DividendsDto dto;
        try {
            dto = bettingService.GetBettingResult(userDetails.getUser(), room_id, is_win);
        }catch (Exception e){
            e.printStackTrace();
            log.info("Error 내용 {}", e.getMessage());
            return ResponseUtils.error(ErrorResponse.of(ErrorType.CANT_CALCULATE_BETTING_POINT));
        }

        return ResponseUtils.ok(dto,MsgType.DATA_SUCCESSFULLY);
    }

    // 3) 현재 총 배팅 현황을 확인
    @GetMapping("room/{room_id}")
    public ApiResponseDto<?> GetTotalBettingResult(
            @PathVariable(value = "room_id") long room_id
    ) {
        ChatRoom chatRoom = chatRoomRepository.findById(room_id).orElse(null);

        PredictDto predictDto = new PredictDto();

        if(chatRoom == null){
            return ResponseUtils.error(ErrorResponse.of(ErrorType.NO_LIVE_BROADCAST_ROOM));
        }

        predictDto.setPredictWin(chatRoom.getWinPoint());
        predictDto.setPredictLose(chatRoom.getLosePoint());

        return ResponseUtils.ok(predictDto, MsgType.DATA_SUCCESSFULLY);
    }

    @GetMapping("user/{user_id}")
    public ApiResponseDto<?> getUserBettingBalance(
            @PathVariable(value = "user_id")long user_id
    ) {
       User user = userRepository.findById(user_id).orElse(null);

       if(user == null){
           return ResponseUtils.error(ErrorResponse.of(ErrorType.NOT_FOUND_USER));
       }

       return ResponseUtils.ok(user.getUserInfoId().getPoint(), MsgType.DATA_SUCCESSFULLY);
    }
}
