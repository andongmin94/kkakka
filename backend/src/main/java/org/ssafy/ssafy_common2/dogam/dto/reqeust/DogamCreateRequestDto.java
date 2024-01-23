package org.ssafy.ssafy_common2.dogam.dto.reqeust;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class DogamCreateRequestDto {

    private MultipartFile imgUrl;
    private String dogamTitle;
}
