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
    private boolean isLogin;
    private String curAlias;
    private String profileImg;
    private UserState state;


    // builder

    @Builder
    public FriendInfoDto(String name, boolean isLogin, String curAlias, String profileImg, UserState state) {

        this.name = name;
        this.isLogin = isLogin;
        this.curAlias = curAlias;
        this.profileImg = profileImg;
        this.state = state;
    }

    // of - 여러 파라미터
    public static FriendInfoDto of(String name, boolean isLogin, String curAlias, String profileImg, UserState state) {

        return builder()
                .name(name)
                .isLogin(isLogin)
                .curAlias(curAlias)
                .profileImg(profileImg)
                .state(state)
                .build();
    }

    public static FriendInfoDto from(User user){

        DynamicUserInfo userInfo = user.getUserInfoId();

        return builder()
                .name(user.getUserName())
                .isLogin(userInfo.isLogin())
                .curAlias(userInfo.getCurAlias())
                .profileImg(user.getKakaoProfileImg())
                .state(UserState.OFFLINE) // 임시
                .build();

    }
}
