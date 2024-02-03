package org.ssafy.ssafy_common2.dogam.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class DogamCommentResponseDto {

    Long commentUserId;
    String commentUserImgUrl;
    String Comment;
    String commentUserName;
    String commentUerEmail;
    private LocalDateTime createdAt;

    @Builder
    private DogamCommentResponseDto(Long commentUserId, String commentUserImgUrl, String comment, String commentUserName, String commentUerEmail, LocalDateTime createdAt) {
        this.commentUserId = commentUserId;
        this.commentUserImgUrl = commentUserImgUrl;
        Comment = comment;
        this.commentUserName = commentUserName;
        this.commentUerEmail = commentUerEmail;
        this.createdAt = createdAt;
    }

    public static DogamCommentResponseDto of(Long commentUserId, String commentUserImgUrl, String comment, String commentUserName, String commentUerEmail, LocalDateTime createdAt) {
        return builder()
                .commentUserId(commentUserId)
                .commentUserImgUrl(commentUserImgUrl)
                .comment(comment)
                .commentUerEmail(commentUerEmail)
                .commentUserName(commentUserName)
                .createdAt(createdAt)
                .build();
    }
}
