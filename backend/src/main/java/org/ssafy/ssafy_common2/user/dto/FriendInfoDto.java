package org.ssafy.ssafy_common2.user.dto;

import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import lombok.Builder;
import lombok.Getter;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;

@Getter
public class FriendInfoDto {

    enum UserState {
        ONLINE, OFFLINE, GAMING, WATCHING
    }

    private String name;
    private Long userId;
    private String email;
    private boolean isLogin;
    private String curAlias;
    private String profileImg;
    private UserState state;


    // builder

    @Builder
    public FriendInfoDto(Long userId, String name, String email, boolean isLogin, String curAlias, String profileImg, UserState state) {

        this.userId = userId;
        this.name = name;
        this.email = email;
        this.isLogin = isLogin;
        this.curAlias = curAlias;
        this.profileImg = profileImg;
        this.state = state;
    }

    // of - 여러 파라미터
    public static FriendInfoDto of(Long userId, String name, String email, boolean isLogin, String curAlias, String profileImg, UserState state) {

        return builder()
                .userId(userId)
                .name(name)
                .email(email)
                .isLogin(isLogin)
                .curAlias(curAlias)
                .profileImg(profileImg)
                .state(state)
                .build();
    }

    public static FriendInfoDto from(User user){

        DynamicUserInfo userInfo = user.getUserInfoId();

        return builder()
                .userId(user.getId())
                .name(user.getUserName())
                .email(user.getKakaoEmail())
                .isLogin(userInfo.isLogin())
                .curAlias(userInfo.getCurAlias())
                .profileImg(user.getKakaoProfileImg())
                .state(UserState.OFFLINE) // 임시
                .build();

    }
}
