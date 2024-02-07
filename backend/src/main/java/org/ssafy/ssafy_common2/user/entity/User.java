package org.ssafy.ssafy_common2.user.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_common2._common.entity.BaseTime;


@Entity
@NoArgsConstructor
// DB 테이블명이 클래스명과 다를 시 작성
@Table(name = "users")
@SQLDelete(sql = "UPDATE users set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
@Getter
public class User extends BaseTime {

    @Id
    // auto_increment로 설정했다면 타입 설정할 것
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 필드명이 다를 시 설정
    @Column(name = "id")
    private Long id;

    @Column(name = "kakao_id", nullable = false)
    private Long kakaoId;

    @Column(name = "kakao_profile_img",nullable = false, length = 250)
    private String kakaoProfileImg;

    @Column(name = "user_name",nullable = false, length = 15)
    private String userName;

    @Column(name = "kakao_email",nullable = false, length = 50)
    private String kakaoEmail;

    @Column(name = "user_role",nullable = false, length = 30)
    private String userRole;

    @Column(name = "riot_id",nullable = true, length = 50)
    private String riotId;

    @OneToOne(optional = false, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_info_id")
    private DynamicUserInfo userInfoId;

    @Builder
    private User(Long kakaoId, String kakaoProfileImg, String userName, String kakaoEmail, String userRole, String riotId, DynamicUserInfo userInfo) {

        this.kakaoId = kakaoId;
        this.kakaoProfileImg = kakaoProfileImg;
        this.userName = userName;
        this.kakaoEmail = kakaoEmail;
        this.userRole = userRole;
        this.riotId = riotId;
        this.userInfoId = userInfo;
    }

    public static User of(Long kakaoId, String kakaoProfileImg, String userName, String kakaoEmail, String userRole, DynamicUserInfo userInfo) {
        return builder()
                .kakaoId(kakaoId)
                .kakaoProfileImg(kakaoProfileImg)
                .userName(userName)
                .kakaoEmail(kakaoEmail)
                .userRole(userRole)
                .userInfo(userInfo)
                .build();
    }

    public static User of(Long kakaoId, String kakaoProfileImg, String userName, String kakaoEmail, String userRole, String riotId, DynamicUserInfo userInfo) {
        return builder()
                .kakaoId(kakaoId)
                .kakaoProfileImg(kakaoProfileImg)
                .userName(userName)
                .kakaoEmail(kakaoEmail)
                .userRole(userRole)
                .riotId(riotId)
                .userInfo(userInfo)
                .build();
    }

    public void updateProfileImg(String profileImgUrl) {
        this.kakaoProfileImg = profileImgUrl;
    }

    public void updateRiotId(String riotId) {
        this.riotId = riotId;
    }
}
