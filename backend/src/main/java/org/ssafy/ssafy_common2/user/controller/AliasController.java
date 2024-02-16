package org.ssafy.ssafy_common2.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.user.dto.Request.AliasCreateRequestDto;
import org.ssafy.ssafy_common2.user.dto.Response.AliasCreateResponseDto;
import org.ssafy.ssafy_common2.user.dto.Response.AliasResponseDto;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.service.AliasService;
import org.ssafy.ssafy_common2.user.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AliasController {

    private final AliasService aliasService;

    @PostMapping("/friends/alias")
    public ApiResponseDto<AliasCreateResponseDto> addAlias(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @RequestParam("receiver-id") Long receiverId,
                                                           @RequestBody AliasCreateRequestDto aliasRequestDto){

        User sender = userDetails.getUser();
        // 받는 사람이 우리 서비스 유저인지 확인
        User receiver = aliasService.validateReceiverByUserId(receiverId);

        return ResponseUtils.ok(aliasService.addAlias(sender, receiver, aliasRequestDto.getAliasName()), MsgType.DATA_SUCCESSFULLY);
    }

    @GetMapping("/profile/alias")
    public ApiResponseDto<Map<String, Object>> getAliasList(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestParam("user-id") Long userId) {

        User user = aliasService.validateReceiverByUserId(userId);
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("aliasList", aliasService.getAliasList(user));

        return ResponseUtils.ok(responseMap, MsgType.SEARCH_SUCCESSFULLY);
    }

}
