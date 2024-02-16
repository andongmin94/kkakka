package org.ssafy.ssafy_common2.dogam.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DogamMainListResponseDto {

    Long friendId;
    String dogamTitle;
    Long dogamId;
    String friendName;
    String friendEmail;
    String friendAlias;
    String dogamImgUrl;
    String friendImgUrl;
    boolean isHated;
    int dogamDislikeNum;
    int dogamCommentNum;
    DogamCommentResponseDto dogamCommentResponseDto;

    @Builder
    private DogamMainListResponseDto(Long friendId, String dogamTitle, Long dogamId, String friendName, String friendEmail,
                                     String friendAlias, String dogamImgUrl, String friendImgUrl, int dogamDislikeNum, boolean isHated, int dogamCommentNum, DogamCommentResponseDto dogamCommentResponseDto) {
        this.friendId = friendId;
        this.dogamTitle = dogamTitle;
        this.dogamId = dogamId;
        this.friendName = friendName;
        this.friendEmail = friendEmail;
        this.friendAlias = friendAlias;
        this.dogamImgUrl = dogamImgUrl;
        this.friendImgUrl = friendImgUrl;
        this.dogamDislikeNum = dogamDislikeNum;
        this.isHated = isHated;
        this.dogamCommentNum = dogamCommentNum;
        this.dogamCommentResponseDto = dogamCommentResponseDto;
    }

    public static DogamMainListResponseDto of(Long friendId, String dogamTitle, Long dogamId, String friendName, String friendEmail,
                                              String friendAlias, String dogamImgUrl, String friendImgUrl, int dogamDislikeNum, boolean isHated, int dogmaCommentNum, DogamCommentResponseDto dogamCommentResponseDto) {
        return builder()
                .friendId(friendId)
                .dogamTitle(dogamTitle)
                .dogamId(dogamId)
                .friendName(friendName)
                .friendEmail(friendEmail)
                .friendAlias(friendAlias)
                .dogamImgUrl(dogamImgUrl)
                .friendImgUrl(friendImgUrl)
                .dogamDislikeNum(dogamDislikeNum)
                .isHated(isHated)
                .dogamCommentNum(dogmaCommentNum)
                .dogamCommentResponseDto(dogamCommentResponseDto)
                .build();
    }
}
