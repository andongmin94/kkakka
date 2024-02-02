package org.ssafy.ssafy_common2.itemshop.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MegaphoneCreateResponseDto {

    private String userEmail;
    private String content;
    private LocalDateTime createdAt;

    @Builder
    private MegaphoneCreateResponseDto(String userEmail, String content, LocalDateTime createdAt) {
        this.userEmail = userEmail;
        this.content = content;
        this.createdAt = createdAt;
    }

    public static MegaphoneCreateResponseDto of(String userEmail, String content, LocalDateTime createdAt) {
        return builder()
                .userEmail(userEmail)
                .content(content)
                .createdAt(createdAt)
                .build();
    }
}
