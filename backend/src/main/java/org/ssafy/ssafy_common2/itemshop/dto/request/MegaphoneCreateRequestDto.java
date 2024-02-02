package org.ssafy.ssafy_common2.itemshop.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MegaphoneCreateRequestDto {

    private String content;

    public MegaphoneCreateRequestDto(String content) {
        this.content = content;
    }
}
