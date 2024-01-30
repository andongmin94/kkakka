package org.ssafy.ssafy_common2.user.dto.Request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AliasCreateRequestDto {

    private String aliasName;

    public AliasCreateRequestDto(String aliasName) {
        this.aliasName = aliasName;
    }
}
