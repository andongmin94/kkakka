package org.ssafy.ssafy_common2._common.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
// Bean을 따로 등록하지 않아도 사용가능
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    UserRepository userRepository;

    // OncePerRequestFilter 메소드를 오버라이드
    // 컴파일 체크
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
	// 요청 헤더의 Authorization 항목 값을 가져와 jwtHeader 변수에 담음.
        String jwtHeader = ((HttpServletRequest)request).getHeader(JwtProperties.HEADER_STRING);

        if(jwtHeader == null || !jwtHeader.startsWith(JwtProperties.TOKEN_PREFIX)){
            filterChain.doFilter(request, response);
            return;
        }

        String token = jwtHeader.replace(JwtProperties.TOKEN_PREFIX, "");

        Long userCode = null;

        try {
            userCode = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token)
                    .getClaim("id").asLong();
        } catch (TokenExpiredException e){
            e.printStackTrace();
            request.setAttribute(JwtProperties.HEADER_STRING, "토큰 만료");
        } catch (JWTVerificationException e){
            e.printStackTrace();
            request.setAttribute(JwtProperties.HEADER_STRING, "유효하지않는 토큰");
        }

        request.setAttribute("userCode", userCode);

        filterChain.doFilter(request, response);
    }

}