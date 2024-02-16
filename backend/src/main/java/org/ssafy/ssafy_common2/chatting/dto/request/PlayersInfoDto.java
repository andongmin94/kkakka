package org.ssafy.ssafy_common2.chatting.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class PlayersInfoDto {

    // 메세지 타입
    private String messageType;

    // 메세지 내용
    private PlayerEvent [] content;

    // 보낸 사람의 아이디
    private long userId;

    // 보낸 사람의 이름
    private String userName;

    // 보낸 사람 프로필 사진
    private String userProfileImg;

    // 보낸 사람 현재 칭호
    private String userCurAlias;

    // 메세지가 보내진 채팅방
    private long chatRoomId;

    // 메세지 생성 시간
    private LocalDateTime createdAt;

    // 메세지 수정 시간
    private LocalDateTime updateAt;

}
