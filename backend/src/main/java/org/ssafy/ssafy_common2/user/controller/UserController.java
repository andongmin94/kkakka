package org.ssafy.ssafy_common2.user.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.ssafy_common2._common.infra.oauth.entity.OauthToken;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.service.UserService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

// 프론트에서 인가코드 돌려 받는 주소
// 인가 코드로 엑세스 토큰 발급 -> 사용자 정보 조회 -> DB 저장 -> jwt 토큰 발급 -> 프론트에 토큰 전달
    @GetMapping("/oauth/callback/kakao/token")
    public ApiResponseDto<Void> getLogin(@RequestParam(value = "code", required = false) String code, HttpServletResponse response){
        System.out.println("code : " + code);
        // code 변경
        OauthToken oauthToken = userService.getAccessToken(code);

        // 발급 받은 accessToken 으로 카카오 회원 정보 DB 저장
        String jwtToken = userService.SaveUserAndGetToken(oauthToken.getAccess_token(), response);

        System.out.println("code : " + code);
        System.out.println("oauthToken : " + oauthToken);
        System.out.println("jwtToken : " + jwtToken);

       return ResponseUtils.ok(MsgType.GENERATE_TOKEN_SUCCESSFULLY);
        //        return oauthToken;
    }

    // jwt 토큰으로 유저정보 요청하기
    @GetMapping("/me")
    public ApiResponseDto<String> getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        User user = userService.getUser(userDetails.getUser());

        System.out.println("user : " + user);
        return ResponseUtils.ok("유저 : " + user.getUserName() + "\n카카오 이메일 : " + user.getKakaoEmail(), MsgType.SEARCH_SUCCESSFULLY);
    }
}