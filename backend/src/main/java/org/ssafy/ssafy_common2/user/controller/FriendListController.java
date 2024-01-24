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
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.service.FriendListService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class FriendListController {

    private final FriendListService friendListService;

    @PostMapping("/friends/{email}")
    public ApiResponseDto<Void> addFriend(@PathVariable(value="email") String friendEmail, @AuthenticationPrincipal UserDetailsImpl userDetails) {

        // 자기 자신과 친구를 맺을 수 없음
        if (friendEmail.equals(userDetails.getUsername())) {
            return ResponseUtils.error(ErrorResponse.of(ErrorType.NOT_FOUND_PARK_TYPE)); // ERRORTYPE 수정 필요
        }

        // friendEmail이 유효한 회원인지 확인
        User receiver = friendListService.validateFriend(friendEmail);

        // 친구 추가하기
        friendListService.addFriend(userDetails.getUser(), receiver);

        return ResponseUtils.ok(MsgType.DATA_SUCCESSFULLY);
    }
}
