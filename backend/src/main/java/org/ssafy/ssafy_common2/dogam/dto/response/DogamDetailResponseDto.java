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
    private String userImgUrl;
    private String dogamImgUrl;
    private String dogamTitle;
    private int dogamHatedNum;
    private boolean hated;
    private String dogamUserName;
    private String dogamUserEmail;
    private LocalDateTime dogamCreatedAt;
    private String curAlias;
    private List<DogamCommentResponseDto> dogamCommentResponseDtos;

    @Builder
    private DogamDetailResponseDto(Long dogamUserId, String userImgUrl, String dogamImgUrl, String dogamTitle, int dogamHatedNum, boolean hated, String dogamUserName, String dogamUserEmail,
                                   LocalDateTime dogamCreatedAt, String curAlias, List<DogamCommentResponseDto> dogamCommentResponseDtos) {
        this.dogamUserId = dogamUserId;
        this.userImgUrl = userImgUrl;
        this.dogamImgUrl = dogamImgUrl;
        this.dogamTitle = dogamTitle;
        this.dogamHatedNum = dogamHatedNum;
        this.hated = hated;
        this.dogamUserName = dogamUserName;
        this.dogamUserEmail = dogamUserEmail;
        this.dogamCreatedAt = dogamCreatedAt;
        this.curAlias = curAlias;
        this.dogamCommentResponseDtos = dogamCommentResponseDtos;
    }

    public static DogamDetailResponseDto of(Long dogamUserId, String userImgUrl, String dogamImgUrl, String dogamTitle, int dogamHatedNum, boolean hated, String dogamUserName, String dogamUserEmail,
                                            LocalDateTime dogamCreatedAt, String curAlias, List<DogamCommentResponseDto> dogamCommentResponseDtos) {
        return builder()
                .dogamUserId(dogamUserId)
                .userImgUrl(userImgUrl)
                .dogamImgUrl(dogamImgUrl)
                .dogamTitle(dogamTitle)
                .dogamHatedNum(dogamHatedNum)
                .hated(hated)
                .dogamUserName(dogamUserName)
                .dogamUserEmail(dogamUserEmail)
                .dogamCreatedAt(dogamCreatedAt)
                .curAlias(curAlias)
                .dogamCommentResponseDtos(dogamCommentResponseDtos)
                .build();
    }
}
