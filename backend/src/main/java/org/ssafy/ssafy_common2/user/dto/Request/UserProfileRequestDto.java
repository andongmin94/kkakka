package org.ssafy.ssafy_common2.user.dto.Request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UserProfileRequestDto {

    private MultipartFile profileImg;
    private MultipartFile backImg;
    private String riotId;
}
