package org.ssafy.ssafy_common2.user.dto.Response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileResponseDto {

    private String profileImg;
    private String backImg;
    private String riotId;

    @Builder
    private UserProfileResponseDto(String profileImg, String backImg, String riotId) {
        this.profileImg = profileImg;
        this.backImg = backImg;
        this.riotId = riotId;
    }

    public static UserProfileResponseDto of(String profileImg, String backImg, String riotId) {
        return builder()
                .profileImg(profileImg)
                .backImg(backImg)
                .riotId(riotId)
                .build();
    }
}
