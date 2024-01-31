package org.ssafy.ssafy_common2.dogam.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class DogamCommentResponseDto {

    String commentUserImgUrl;
    String Comment;
    String commentUserName;
    String commentUerEmail;
    private LocalDateTime createdAt;

    @Builder
    private DogamCommentResponseDto(String commentUserImgUrl, String comment, String commentUserName, String commentUerEmail, LocalDateTime createdAt) {
        this.commentUserImgUrl = commentUserImgUrl;
        Comment = comment;
        this.commentUserName = commentUserName;
        this.commentUerEmail = commentUerEmail;
        this.createdAt = createdAt;
    }

    public static DogamCommentResponseDto of(String commentUserImgUrl, String comment, String commentUserName, String commentUerEmail, LocalDateTime createdAt) {
        return builder()
                .commentUserImgUrl(commentUserImgUrl)
                .comment(comment)
                .commentUerEmail(commentUerEmail)
                .commentUserName(commentUserName)
                .createdAt(createdAt)
                .build();
    }
}
