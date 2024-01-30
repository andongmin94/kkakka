package org.ssafy.ssafy_common2.dogam.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DogamCommentResponseDto {

    String friendImgUrl;
    String Comment;
    String userName;
    String userEmail;

    @Builder
    private DogamCommentResponseDto(String friendImgUrl, String comment, String userName, String userEmail) {
        this.friendImgUrl = friendImgUrl;
        Comment = comment;
        this.userName = userName;
        this.userEmail = userEmail;
    }

    public static DogamCommentResponseDto of(String friendImgUrl, String comment, String userName, String userEmail) {
        return builder()
                .friendImgUrl(friendImgUrl)
                .comment(comment)
                .userEmail(userEmail)
                .userName(userName)
                .build();
    }
}
