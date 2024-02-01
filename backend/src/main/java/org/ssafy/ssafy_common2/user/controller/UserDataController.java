package org.ssafy.ssafy_common2.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.user.service.UserDataService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserDataController {

    private final UserDataService userDataService;
    @GetMapping("/user/point")
    public ApiResponseDto<Map<String,Integer>> getPoint(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Map<String, Integer> map = new HashMap<>();
        int point = userDataService.getPoint(userDetails.getUser());
        map.put("Point", point);
        return ResponseUtils.ok(map, MsgType.SEARCH_POINT_SUCCESSFULLY);

    }
}
