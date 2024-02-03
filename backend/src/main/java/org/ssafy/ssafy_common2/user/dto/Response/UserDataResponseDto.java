package org.ssafy.ssafy_common2.user.dto.Response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class UserDataResponseDto {

    Long UserId;
    String userEmail;
    String userProfileImg;

    @Builder
    private UserDataResponseDto(Long userId, String userEmail, String userProfileImg) {
        UserId = userId;
        this.userEmail = userEmail;
        this.userProfileImg = userProfileImg;
    }

    public static UserDataResponseDto of(Long userId, String userEmail, String userProfileImg) {
        return builder()
                .userId(userId)
                .userEmail(userEmail)
                .userProfileImg(userProfileImg)
                .build();
    }
}
