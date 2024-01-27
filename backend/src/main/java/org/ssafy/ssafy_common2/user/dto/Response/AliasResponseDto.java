package org.ssafy.ssafy_common2.user.dto.Response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AliasResponseDto {

    private String alias;
    private LocalDateTime createdAt;
    private String creator;

    @Builder
    public AliasResponseDto(String alias, LocalDateTime createdAt, String creator) {
        this.alias = alias;
        this.createdAt = createdAt;
        this.creator = creator;
    }

    public static AliasResponseDto of(String alias, LocalDateTime createdAt, String creator) {

        return builder()
                .alias(alias)
                .createdAt(createdAt)
                .creator(creator)
                .build();
    }

}
