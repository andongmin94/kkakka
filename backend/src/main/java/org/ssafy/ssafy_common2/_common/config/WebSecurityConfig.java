package org.ssafy.ssafy_common2._common.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.ssafy.ssafy_common2._common.jwt.JwtAuthFilter;
import org.ssafy.ssafy_common2._common.jwt.JwtUtil;
import org.ssafy.ssafy_common2._common.security.CustomAuthenticationEntryPoint;

import java.util.Arrays;


@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig {

    private final JwtUtil jwtUtil;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {

        return (web) -> web.ignoring()
//                .requestMatchers(PathRequest.toH2Console())
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf().disable();
        http.formLogin().disable();

        // 기본 설정인 Session 방식 사용하지 않고 JWT 방식 사용
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        //SockJS는 기본적으로 HTML iframe 요소를 통한 전송을 허용하지 않도록 설정되는데 해당 설정을 해제
        http.headers((header) -> header.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin));

        http.authorizeRequests()
                .requestMatchers("/api/oauth/callback/kakao/token").permitAll()
                .requestMatchers("/oauth/authorize").permitAll()
                .requestMatchers("/hello").permitAll()
//                .requestMatchers("/api/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/booking/**").permitAll()
//                .anyRequest().authenticated()
                .and().exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                .and().addFilterBefore(new JwtAuthFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);


        http.cors().configurationSource(request -> {
            CorsConfiguration cors = new CorsConfiguration();
            cors.setAllowedOriginPatterns(Arrays.asList("*"));
            cors.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
            cors.setAllowedHeaders(Arrays.asList("*"));
            cors.addExposedHeader("Authorization");
            cors.setAllowCredentials(true);

            return cors;
        });


        return http.build();
    }

}