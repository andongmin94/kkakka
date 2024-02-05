package org.ssafy.ssafy_common2.user.dto.Response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserProfileEditResponseDto {

    String profileImg;
    String backImg;
    String riotId;

    @Builder
    private UserProfileEditResponseDto(String profileImg, String backImg, String riotId) {
        this.profileImg = profileImg;
        this.backImg = backImg;
        this.riotId = riotId;
    }

    public static UserProfileEditResponseDto of(String profileImg, String backImg, String riotId) {
        return builder()
                .profileImg(profileImg)
                .backImg(backImg)
                .riotId(riotId)
                .build();
    }
}
