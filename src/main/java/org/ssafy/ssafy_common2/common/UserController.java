package org.ssafy.ssafy_common2.common;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

@RestController
@RequestMapping("/api")
@Transactional
public class UserController {
    private UserService userService;



    public UserController(@Qualifier("userService") UserService userService) {
        this.userService = userService;
    }

// 프론트에서 인가코드 돌려 받는 주소
// 인가 코드로 엑세스 토큰 발급 -> 사용자 정보 조회 -> DB 저장 -> jwt 토큰 발급 -> 프론트에 토큰 전달
    @GetMapping("/oauth/callback/kakao/token")
    public ResponseEntity getLogin(@RequestParam(value = "code", required = false) String code){
        // code 변경
        code = "VMDZvVyI0gOh9UpCid6DHOIIcEJvHEkFMZH1Lm61U5e4E5RoGXiy5Lws8wQKPXSXAAABjQrTBfSBPKUF0hG4dQ";
        OauthToken oauthToken = userService.getAccessToken(code);

        // 발급 받은 accessToken 으로 카카오 회원 정보 DB 저장
        String jwtToken = userService.SaveUserAndGetToken(oauthToken.getAccess_token());

        HttpHeaders headers = new HttpHeaders();
        headers.add(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
        System.out.println("code : " + code);
        System.out.println("oauthToken : " + oauthToken);
        System.out.println("jwtToken : " + jwtToken);
        System.out.println("headers : " + headers);
       return ResponseEntity.ok().headers(headers).body("success");
        //        return oauthToken;
    }

    // jwt 토큰으로 유저정보 요청하기
    @GetMapping("/me")
    public ResponseEntity<Object> getCurrentUser(HttpServletRequest request){

        User user = userService.getUser(request);

        System.out.println("user" + user);
        return ResponseEntity.ok().body(user);
    }

}