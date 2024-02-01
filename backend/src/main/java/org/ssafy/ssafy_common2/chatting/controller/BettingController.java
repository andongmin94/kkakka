package org.ssafy.ssafy_common2.chatting.controller;

import io.lettuce.core.dynamic.annotation.Param;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2.chatting.dto.response.BettingDto;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/betting/")
public class BettingController {

    @PostMapping("/{roomId}")
    public ApiResponseDto<BettingDto> LetsBetting(@Param(value = "roomId") long roomId,
    @Param(value = "curBettingPoint") int BetPoint, @Param(value = "isWin") boolean isWin) {



        return null;
    }
}
