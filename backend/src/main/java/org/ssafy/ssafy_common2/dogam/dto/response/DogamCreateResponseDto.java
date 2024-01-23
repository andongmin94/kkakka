package org.ssafy.ssafy_common2.dogam.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DogamCreateResponseDto {

    private String imgUrl;
    private String dogamTitle;

    @Builder
    private DogamCreateResponseDto(String imgUrl, String dogamTitle) {
        this.imgUrl = imgUrl;
        this.dogamTitle = dogamTitle;
    }

    public static DogamCreateResponseDto of(String imgUrl, String dogamTitle) {
        return builder()
                .imgUrl(imgUrl)
                .dogamTitle(dogamTitle)
                .build();
    }
}
