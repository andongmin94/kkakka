package org.ssafy.ssafy_common2.user.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorResponse;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.user.dto.FriendInfoDto;
import org.ssafy.ssafy_common2.user.dto.Response.FriendStateResponseDto;
import org.ssafy.ssafy_common2.user.dto.Response.UserDataResponseDto;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.service.FriendListService;
import org.ssafy.ssafy_common2.user.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class FriendListController {

    private final FriendListService friendListService;
    private final UserService userService;

    // 현재 친구 상태를 조회
    @GetMapping("/friends/{friend-user-id}")
    public ApiResponseDto<FriendStateResponseDto> getFriendState(@PathVariable("friend-user-id") Long friendUserId,
                                                                 @AuthenticationPrincipal UserDetailsImpl userDetails) {

        return ResponseUtils.ok(friendListService.createFriendStateResponse(userDetails.getUser(), friendUserId), MsgType.SEARCH_SUCCESSFULLY);
    }

    // 친구 요청, 친구 요청 수락, 친구 신청 취소하기, 친구 끊기
    @PostMapping("/friends/{friend-user-id}")
    public ApiResponseDto<Void> addFriend(@PathVariable("friend-user-id") Long friendUserId,
                                          @AuthenticationPrincipal UserDetailsImpl userDetails) {

        return ResponseUtils.ok(friendListService.editFriendState(userDetails.getUser(), friendUserId));
    }

    // 친구 리스트 조회
    @GetMapping("/friends")
    public ApiResponseDto<Map<String, Object>> getFriends(@AuthenticationPrincipal UserDetailsImpl userDetails){

        List<FriendInfoDto> friendInfoList = friendListService.getFriendInfoList(userDetails.getUser());

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("friendList", friendInfoList);

        return ResponseUtils.ok(responseMap, MsgType.SEARCH_SUCCESSFULLY);
    }
}
