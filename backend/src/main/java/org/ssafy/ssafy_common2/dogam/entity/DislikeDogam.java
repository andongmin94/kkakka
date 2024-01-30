package org.ssafy.ssafy_common2.dogam.entity;

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
@SQLDelete(sql = "UPDATE dislike_dogam set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class DislikeDogam extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email",nullable = false, length = 250)
    private String userEmail;

    @Column(name = "is_dislike",nullable = false)
    private boolean isDislike;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dogam_id")
    public Dogam dogam;

    @Builder
    private DislikeDogam(Long id, String userEmail, boolean isDislike, Dogam dogam) {
        this.id = id;
        this.userEmail = userEmail;
        this.isDislike = isDislike;
        this.dogam = dogam;
    }
}
