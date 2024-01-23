package org.ssafy.ssafy_common2.dogam.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ssafy.ssafy_common2._common.entity.BaseTime;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    @JoinColumn(name = "DOGAM_ID", nullable = false)
    private Dogam dogam;

    @Builder
    private CommentDogam(Long id, String userEmail, String dogamComment, Dogam dogam) {
        this.id = id;
        this.userEmail = userEmail;
        this.dogamComment = dogamComment;
        this.dogam = dogam;
    }
}
