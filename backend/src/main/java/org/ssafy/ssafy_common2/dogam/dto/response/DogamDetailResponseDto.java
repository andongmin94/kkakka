package org.ssafy.ssafy_common2.dogam.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class DogamDetailResponseDto {

    private Long dogamUserId;
    private String imgUrl;
    private String dogamTitle;
    private String dogamUserName;
    private String dogamUserEmail;
    private LocalDateTime dogamCreatedAt;
    private List<DogamCommentResponseDto> dogamCommentResponseDtos;
    private String curAlias;

    @Builder
    private DogamDetailResponseDto(Long dogamUserId, String imgUrl, String dogamTitle, String dogamUserName, String dogamUserEmail,
                                   LocalDateTime dogamCreatedAt, String curAlias, List<DogamCommentResponseDto> dogamCommentResponseDtos) {
        this.dogamUserId = dogamUserId;
        this.imgUrl = imgUrl;
        this.dogamTitle = dogamTitle;
        this.dogamUserName = dogamUserName;
        this.dogamUserEmail = dogamUserEmail;
        this.dogamCreatedAt = dogamCreatedAt;
        this.curAlias = curAlias;
        this.dogamCommentResponseDtos = dogamCommentResponseDtos;
    }

    public static DogamDetailResponseDto of(Long dogamUserId, String imgUrl, String dogamTitle, String dogamUserName, String dogamUserEmail,
                                            LocalDateTime dogamCreatedAt, String curAlias, List<DogamCommentResponseDto> dogamCommentResponseDtos) {
        return builder()
                .dogamUserId(dogamUserId)
                .imgUrl(imgUrl)
                .dogamTitle(dogamTitle)
                .dogamUserName(dogamUserName)
                .dogamUserEmail(dogamUserEmail)
                .dogamCreatedAt(dogamCreatedAt)
                .curAlias(curAlias)
                .dogamCommentResponseDtos(dogamCommentResponseDtos)
                .build();
    }
}
