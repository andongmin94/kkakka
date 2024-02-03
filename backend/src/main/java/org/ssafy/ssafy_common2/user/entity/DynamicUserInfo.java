package org.ssafy.ssafy_common2.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_common2._common.entity.BaseTime;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE dynamic_user_info set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class DynamicUserInfo extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "point", nullable = false)
    private int point;

    @Column(name = "is_login", nullable = false)
    private boolean isLogin;

    @Column(name = "is_betting", nullable = false)
    private int isBetting;

    @Column(name = "cur_alias", length = 50)
    private String curAlias;

    @Column(name = "last_noti_event_id")
    private String lastNotiEventId;

    @Column(name = "back_img",nullable = false, length = 250)
    private String backImg;

    @Builder
    private DynamicUserInfo(int point, boolean isLogin, int isBetting, String backImg) {
        this.point = point;
        this.isLogin = isLogin;
        this.isBetting = isBetting;
        this.curAlias = "테스트용 칭호";
        this.backImg = backImg;
    }

    public static DynamicUserInfo of(int point, boolean isLogin, int isBetting, String backImg) {
        return builder()
                .point(point)
                .isLogin(isLogin)
                .isBetting(isBetting)
                .backImg(backImg)
                .build();
    }

    public void addPoint(int point) {
        this.point += point;
    }

    public void minusPoint(int point) {
        this.point -= point;
    }

    public void updateCurAlias(String curAlias) {
        this.curAlias = curAlias;
    }

    public void updateLastNotiEventId(String lastNotiEventId) { this.lastNotiEventId = lastNotiEventId;}
}
