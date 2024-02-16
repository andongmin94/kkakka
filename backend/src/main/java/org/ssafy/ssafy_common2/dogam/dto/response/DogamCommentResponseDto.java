package org.ssafy.ssafy_common2.dogam.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class DogamCommentResponseDto {

    Long commentId;
    Long commentUserId;
    String commentUserImgUrl;
    String comment;
    String commentUserName;
    String commentUserEmail;
    private LocalDateTime createdAt;

    @Builder
    private DogamCommentResponseDto(Long commentId, Long commentUserId, String commentUserImgUrl, String comment, String commentUserName, String commentUserEmail, LocalDateTime createdAt) {
        this.commentId = commentId;
        this.commentUserId = commentUserId;
        this.commentUserImgUrl = commentUserImgUrl;
        this.comment = comment;
        this.commentUserName = commentUserName;
        this.commentUserEmail = commentUserEmail;
        this.createdAt = createdAt;
    }

    public static DogamCommentResponseDto of(Long commentId, Long commentUserId, String commentUserImgUrl, String comment, String commentUserName, String commentUerEmail, LocalDateTime createdAt) {
        return builder()
                .commentId(commentId)
                .commentUserId(commentUserId)
                .commentUserImgUrl(commentUserImgUrl)
                .comment(comment)
                .commentUserEmail(commentUerEmail)
                .commentUserName(commentUserName)
                .createdAt(createdAt)
                .build();
    }
}
