package org.ssafy.ssafy_common2.dogam.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class DogamProfileListResponseDto {

    Long dogamId;
    String dogamImgUrl;
    String dogamTitle;
    LocalDateTime createdAt;
    int dogamHateAmount;
    boolean isHated;
    int commentNum;

    @Builder
    private DogamProfileListResponseDto(Long dogamId, String dogamImgUrl, String dogamTitle, LocalDateTime createdAt, int dogamHateAmount, boolean isHated, int commentNum) {
        this.dogamId = dogamId;
        this.dogamImgUrl = dogamImgUrl;
        this.dogamTitle = dogamTitle;
        this.createdAt = createdAt;
        this.dogamHateAmount = dogamHateAmount;
        this.isHated = isHated;
        this.commentNum = commentNum;
    }

    public static DogamProfileListResponseDto of(Long dogamId, String dogamImgUrl, String dogamTitle, LocalDateTime createdAt, int dogamHateAmount, boolean isHated, int commentNum) {
        return builder()
                .dogamId(dogamId)
                .dogamImgUrl(dogamImgUrl)
                .dogamTitle(dogamTitle)
                .createdAt(createdAt)
                .dogamHateAmount(dogamHateAmount)
                .isHated(isHated)
                .commentNum(commentNum)
                .build();
    }
}
