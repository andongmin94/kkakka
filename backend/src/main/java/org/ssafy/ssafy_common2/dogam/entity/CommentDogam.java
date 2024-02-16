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
@SQLDelete(sql = "UPDATE comment_dogam set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class CommentDogam extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email",nullable = false, length = 250)
    private String userEmail;

    @Column(name = "dogam_comment",nullable = false, length = 255)
    private String dogamComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dogam_id")
    public Dogam dogam;

    @Builder
    private CommentDogam(String userEmail, String dogamComment, Dogam dogam) {
        this.userEmail = userEmail;
        this.dogamComment = dogamComment;
        this.dogam = dogam;
    }

    public static CommentDogam of(String userEmail, String dogamComment, Dogam dogam) {
        return builder()
                .userEmail(userEmail)
                .dogamComment(dogamComment)
                .dogam(dogam)
                .build();
    }
}
