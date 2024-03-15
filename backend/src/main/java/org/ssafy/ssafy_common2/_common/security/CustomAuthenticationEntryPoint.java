package org.ssafy.ssafy_common2._common.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.ssafy.ssafy_common2._common.exception.ErrorResponse;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        Object attribute = request.getAttribute("exception");
        ErrorType error = attribute instanceof ErrorType ? (ErrorType) attribute : ErrorType.NOT_TOKEN;
        exceptionHandler(response, error);
    }

    public void exceptionHandler(HttpServletResponse response, ErrorType error) {

        response.setStatus(error.getCode());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        try {
            String json = objectMapper.writeValueAsString(ResponseUtils.error(ErrorResponse.of(error)));
            response.getWriter().write(json);
            log.warn("Authentication rejected with status {}", error.getCode());
        } catch (Exception e) {
            log.error("Failed to write authentication error response");
        }
    }
}
