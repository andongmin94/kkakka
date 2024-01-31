package org.ssafy.ssafy_common2.dogam.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class DogamDetailResponseDto {

    private String imgUrl;
    private String dogamTitle;
    private String dogamUserName;
    private LocalDateTime dogamCreatedAt;
    private List<DogamCommentResponseDto> dogamCommentResponseDtos;

    @Builder
    private DogamDetailResponseDto(String imgUrl, String dogamTitle, String dogamUserName, LocalDateTime dogamCreatedAt, List<DogamCommentResponseDto> dogamCommentResponseDtos) {
        this.imgUrl = imgUrl;
        this.dogamTitle = dogamTitle;
        this.dogamUserName = dogamUserName;
        this.dogamCreatedAt = dogamCreatedAt;
        this.dogamCommentResponseDtos = dogamCommentResponseDtos;
    }

    public static DogamDetailResponseDto of(String imgUrl, String dogamTitle, String dogamUserName, LocalDateTime dogamCreatedAt, List<DogamCommentResponseDto> dogamCommentResponseDtos) {
        return builder()
                .imgUrl(imgUrl)
                .dogamTitle(dogamTitle)
                .dogamUserName(dogamUserName)
                .dogamCreatedAt(dogamCreatedAt)
                .dogamCommentResponseDtos(dogamCommentResponseDtos)
                .build();
    }
}
