package org.ssafy.ssafy_common2.itemshop.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EnforcementCreateRequestDto {

    private String enfScript;

    public EnforcementCreateRequestDto(String enfScript) {
        this.enfScript = enfScript;
    }
}
