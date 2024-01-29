package org.ssafy.ssafy_common2.user.dto.Response;

import lombok.Builder;
import lombok.Getter;
import org.ssafy.ssafy_common2.user.entity.Alias;

import java.time.LocalDateTime;

@Getter
public class AliasCreateResponseDto {

    private String aliasName;
    private LocalDateTime createdAt;

    @Builder
    public AliasCreateResponseDto(String aliasName, LocalDateTime createdAt) {

        this.aliasName = aliasName;
        this.createdAt = createdAt;
    }

    public static AliasCreateResponseDto from(Alias alias){

        return builder()
                .aliasName(alias.getAliasName())
                .createdAt(alias.getCreatedAt())
                .build();
    }
}
