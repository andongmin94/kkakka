package org.ssafy.ssafy_common2.user.dto.Response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FriendStateResponseDto {

    private String state;

    @Builder
    private FriendStateResponseDto(String state) {
        this.state = state;
    }

    public static FriendStateResponseDto of(String state) {
        return builder()
                .state(state)
                .build();
    }
}
