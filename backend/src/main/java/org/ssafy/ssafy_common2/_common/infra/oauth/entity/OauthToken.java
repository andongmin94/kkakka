package org.ssafy.ssafy_common2._common.infra.oauth.entity;

import lombok.*;

@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자를 만듦
@NoArgsConstructor // 파라미터가 없는 기본 생성자를 생성
@Data // data 어노테이션에서 getter와 setter 부분이 작동하지 않아서 아래 추가함.
@Getter
@Setter
// json형태 OauthToken 객체 데이터값 저장
public class OauthToken {

    private String token_type;
    private String access_token;
    private int expires_in;
    private String refresh_token;
    private int refresh_token_expires_in;
    private String scope;
}
