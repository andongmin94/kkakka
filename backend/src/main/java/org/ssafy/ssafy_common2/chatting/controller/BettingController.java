package org.ssafy.ssafy_common2.chatting.controller;

import io.lettuce.core.dynamic.annotation.Param;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.ssafy_common2._common.exception.ErrorResponse;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.chatting.dto.response.BettingDto;
import org.ssafy.ssafy_common2.chatting.dto.response.DividendsDto;
import org.ssafy.ssafy_common2.chatting.repository.ChatJoinRepository;
import org.ssafy.ssafy_common2.chatting.service.BettingService;
import org.ssafy.ssafy_common2.chatting.service.ChatRoomMySQLService;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/betting/")
public class BettingController {

    private final BettingService bettingService;
    private final ChatRoomMySQLService chatRoomMySQLService;
    private final ChatJoinRepository chatJoinRepository;


    // 1) 배팅하기
    @PostMapping("/{roomId}")
    public ApiResponseDto<?> LetsBetting(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Param(value = "room_id") long room_id,
            @Param(value = "cur_betting_point") int cur_betting_point,
            @Param(value = "is_win") boolean is_win) {

        BettingDto ans = bettingService.LetsBetting(userDetails.getUser().getId()
        , room_id,cur_betting_point, is_win);

        if(ans == null){
            return ResponseUtils.error(ErrorResponse.of(ErrorType.FAILED_TO_BETTING));
        }else {
            return ResponseUtils.ok(ans, MsgType.DATA_SUCCESSFULLY);
        }
    }

    // 2) 배팅 금액 정산 받기
    @PostMapping("/{roomId}/result")
    public ApiResponseDto<?> GetBettingResult(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Param(value = "room_id")long room_id,
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
}
