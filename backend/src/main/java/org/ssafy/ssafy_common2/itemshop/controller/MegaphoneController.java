package org.ssafy.ssafy_common2.itemshop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.itemshop.dto.request.MegaphoneCreateRequestDto;
import org.ssafy.ssafy_common2.itemshop.dto.response.MegaphoneCreateResponseDto;
import org.ssafy.ssafy_common2.itemshop.service.MegaphoneService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MegaphoneController {

    private final MegaphoneService megaphoneService;

    @PostMapping("/friends/megaphone")
    public ApiResponseDto<MegaphoneCreateResponseDto> createMegaphone(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                      @RequestBody MegaphoneCreateRequestDto requestDto){
        return ResponseUtils.ok(megaphoneService.createMegaphone(userDetails.getUser(), requestDto), MsgType.DATA_SUCCESSFULLY);
    }
}
