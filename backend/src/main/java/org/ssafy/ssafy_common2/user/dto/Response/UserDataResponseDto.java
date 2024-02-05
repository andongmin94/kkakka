package org.ssafy.ssafy_common2.user.dto.Response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class UserDataResponseDto {

    Long UserId;
    String userName;
    String userEmail;
    String userProfileImg;
    String userBackImg;
    String userAlias;
    boolean isBankruptcy; // 파산 여부
    String riotId;

    @Builder
    public UserDataResponseDto(Long userId, String userName, String userEmail, String userProfileImg, String userBackImg, String userAlias, boolean isBankruptcy, String riotId) {
        UserId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userProfileImg = userProfileImg;
        this.userBackImg = userBackImg;
        this.userAlias = userAlias;
        this.isBankruptcy = isBankruptcy;
        this.riotId = riotId;
    }

    public static UserDataResponseDto of(Long userId, String userName, String userEmail, String userProfileImg, String userBackImg, String userAlias, boolean isBankruptcy, String riotId) {
        return builder()
                .userId(userId)
                .userName(userName)
                .userEmail(userEmail)
                .userProfileImg(userProfileImg)
                .userBackImg(userBackImg)
                .userAlias(userAlias)
                .isBankruptcy(isBankruptcy)
                .riotId(riotId)
                .build();
    }
}
