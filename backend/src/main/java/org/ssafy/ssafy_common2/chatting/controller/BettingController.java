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
import org.ssafy.ssafy_common2.chatting.service.BettingService;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/betting/")
public class BettingController {

    private final BettingService bettingService;

    @PostMapping("/{roomId}")
    public ApiResponseDto<?> LetsBetting(
            @AuthenticationPrincipal UserDetailsImpl userDetails, @Param(value = "roomId") long roomId,
            @Param(value = "curBettingPoint") int betPoint, @Param(value = "isWin") boolean isWin) {

        BettingDto ans = bettingService.LetsBetting(userDetails.getUser().getId()
        , roomId,betPoint, isWin);

        if(ans == null){
            return ResponseUtils.error(ErrorResponse.of(ErrorType.FAILED_TO_BETTING));
        }else {
            return ResponseUtils.ok(ans, MsgType.DATA_SUCCESSFULLY);
        }
    }
}
