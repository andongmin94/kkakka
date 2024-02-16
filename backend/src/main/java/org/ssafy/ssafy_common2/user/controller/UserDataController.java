package org.ssafy.ssafy_common2.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.user.dto.Request.UserProfileRequestDto;
import org.ssafy.ssafy_common2.user.dto.Response.UserDataResponseDto;
import org.ssafy.ssafy_common2.user.dto.Response.UserProfileEditResponseDto;
import org.ssafy.ssafy_common2.user.dto.Response.UserProfileResponseDto;
import org.ssafy.ssafy_common2.user.service.UserDataService;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserDataController {

    private final UserDataService userDataService;

    @GetMapping("/users/point")
    public ApiResponseDto<Map<String, Integer>> getPoint(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        Map<String, Integer> map = userDataService.getPoint(userDetails.getUser());
        return ResponseUtils.ok(map, MsgType.SEARCH_POINT_SUCCESSFULLY);

    }

    @GetMapping("/users/data")
    public ApiResponseDto<UserDataResponseDto> getEmailProfileImg(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        UserDataResponseDto map = userDataService.getEmailProfileImg(userDetails.getUser());
        return ResponseUtils.ok(map, MsgType.SEARCH_MY_PROFILE_DATA_SUCCESSFULLY);
    }

    @GetMapping("/users/data/{user-id}")
    public ApiResponseDto<UserDataResponseDto> getUserData(@PathVariable(value = "user-id") Long userId, @AuthenticationPrincipal UserDetailsImpl userDetails) {

        UserDataResponseDto map = userDataService.getUserData(userId, userDetails.getUser());
        return ResponseUtils.ok(map, MsgType.SEARCH_USER_DATA_SUCCESSFULLY);
    }

    @PutMapping("/users/profile-edit")
    public ApiResponseDto<UserProfileResponseDto> updateUserProfile(@AuthenticationPrincipal UserDetailsImpl userDetails, @ModelAttribute UserProfileRequestDto dto) throws IOException {

        UserProfileResponseDto ans = userDataService.updateUserProfile(userDetails.getUser(), dto);
        return ResponseUtils.ok(ans, MsgType.UPDATE_USER_PROFILE_DATA_SUCCESSFULLY);
    }

    @GetMapping("/users/profile-edit")
    public ApiResponseDto<UserProfileEditResponseDto> getProfileEdit(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        UserProfileEditResponseDto dto = userDataService.getProfileEdit(userDetails.getUser());
        return ResponseUtils.ok(dto, MsgType.SEARCH_USER_EDIT_DATA_SUCCESSFULLY);
    }

    @PostMapping("/users/friends/search")
    public ApiResponseDto<Map<String, UserDataResponseDto>> searchFriends(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody Map<String,String> userEmail){

        UserDataResponseDto friendInfo = userDataService.searchFriends(userDetails.getUser(), userEmail.get("userEmail"));

        Map<String, UserDataResponseDto> responseMap = new HashMap<>();
        responseMap.put("UserDataResponseDto", friendInfo);

        return ResponseUtils.ok(responseMap, MsgType.SEARCH_SUCCESSFULLY);
    }
}
