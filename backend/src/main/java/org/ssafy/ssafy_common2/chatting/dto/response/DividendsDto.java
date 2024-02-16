package org.ssafy.ssafy_common2.chatting.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DividendsDto {

    // 유저 아이디, 현재 유저 포인트, 베팅에서 졌는가 이겼는가
    private long userId;
    private int curUserPoint;
    private boolean isUserWin;

}
