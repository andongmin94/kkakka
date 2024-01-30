package org.ssafy.ssafy_common2.itemshop.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ssafy.ssafy_common2.itemshop.entity.Enforcement;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class EnforcementCreateResponseDto {

    private String enfScript;
    private LocalDateTime createdAt;

    @Builder
    public EnforcementCreateResponseDto(String enfScript, LocalDateTime createdAt) {
        this.enfScript = enfScript;
        this.createdAt = createdAt;
    }

    public EnforcementCreateResponseDto of(String enfScript, LocalDateTime createdAt) {
        return builder()
                .enfScript(enfScript)
                .createdAt(createdAt)
                .build();
    }

    public static EnforcementCreateResponseDto from(Enforcement enforcement) {
        return builder()
                .enfScript(enforcement.getEnfScript())
                .createdAt(enforcement.getCreatedAt())
                .build();
    }

}
