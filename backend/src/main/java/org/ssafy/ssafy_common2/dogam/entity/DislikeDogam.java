package org.ssafy.ssafy_common2.dogam.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DislikeDogam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email",nullable = false, length = 250)
    private String userEmail;

    @Column(name = "is_dislike",nullable = false, length = 255)
    private String isDislike;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DOGAM_ID", nullable = false)
    private Dogam dogam;

    @Builder
    private DislikeDogam(Long id, String userEmail, String isDislike, Dogam dogam) {
        this.id = id;
        this.userEmail = userEmail;
        this.isDislike = isDislike;
        this.dogam = dogam;
    }
}
