package org.ssafy.ssafy_common2.user.dto.Request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UserBackImgRequestDto {

    private MultipartFile backImg;
}
