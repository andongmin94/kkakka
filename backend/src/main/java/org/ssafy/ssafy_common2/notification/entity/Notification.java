package org.ssafy.ssafy_common2.notification.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_common2._common.entity.BaseTime;
import org.ssafy.ssafy_common2.user.entity.User;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE notification set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class Notification extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name="noti_type", nullable = false)
    private NotificationType notificationType;

    @Column(name = "noti_content", nullable = false, length = 100)
    private String notiContent;

    @Column(name = "is_check", nullable = false)
    private Boolean isChecked;

    @Column(name = "related_img", nullable = false, length = 255)
    private String relatedImg;

    @Column(name = "related_email", length = 50)
    private String relatedEmail;

    @Column(name = "related_con_id")
    private Long relatedContentId;


    @Builder
    public Notification(User user, NotificationType notificationType, String notiContent, Boolean isChecked, String relatedImg, String relatedEmail, Long relatedContentId) {
        this.user = user;
        this.notificationType = notificationType;
        this.notiContent = notiContent;
        this.isChecked = isChecked;
        this.relatedImg = relatedImg;
        this.relatedEmail = relatedEmail;
        this.relatedContentId = relatedContentId;
    }


    public static Notification of(User user, NotificationType notificationType, String notiContent, String relatedImg, String relatedEmail, Long relatedContentId) {

        return builder()
                .user(user)
                .notificationType(notificationType)
                .notiContent(notiContent)
                .relatedImg(relatedImg)
                .relatedEmail(relatedEmail)
                .relatedContentId(relatedContentId)
                .isChecked(false)
                .build();
    }

    public void updateIsChecked(boolean isChecked) {
        this.isChecked = isChecked;
    }


}
