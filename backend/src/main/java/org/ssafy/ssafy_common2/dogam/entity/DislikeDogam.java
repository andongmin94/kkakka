package org.ssafy.ssafy_common2.dogam.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_common2._common.entity.BaseTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE dislike_dogam set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class DislikeDogam extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email",nullable = false, length = 250)
    private String userEmail;

    @Setter
    @Column(name = "is_dislike",nullable = false)
    private boolean isDislike;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dogam_id")
    public Dogam dogam;

    @Builder
    private DislikeDogam(String userEmail, boolean isDislike, Dogam dogam) {
        this.userEmail = userEmail;
        this.isDislike = isDislike;
        this.dogam = dogam;
    }

    public static DislikeDogam of(String kakaoEmail, boolean b, Dogam dogam) {
        return builder()
                .userEmail(kakaoEmail)
                .isDislike(b)
                .dogam(dogam)
                .build();
    }

}
