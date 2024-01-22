package org.ssafy.ssafy_common2.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DynamicUserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "point",nullable = false)
    private int point;

    @Column(name = "is_login",nullable = false)
    private boolean isLogin;

    @Column(name = "is_betting",nullable = false)
    private int isBetting;

    @Column(name = "cur_alias", length = 50)
    private String curAlias;

    @Builder
    private DynamicUserInfo(int point, boolean isLogin, int isBetting, String curAlias) {
        this.point = point;
        this.isLogin = isLogin;
        this.isBetting = isBetting;
        this.curAlias = curAlias;
    }

    public static DynamicUserInfo of(int point, boolean isLogin, int isBetting) {
        return builder()
                .point(point)
                .isLogin(isLogin)
                .isBetting(isBetting)
                .build();
    }
}
