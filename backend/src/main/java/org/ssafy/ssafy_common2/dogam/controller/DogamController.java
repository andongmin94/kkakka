package org.ssafy.ssafy_common2.dogam.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.dogam.dto.reqeust.DogamCreateRequestDto;
import org.ssafy.ssafy_common2.dogam.dto.response.DogamCreateResponseDto;
import org.ssafy.ssafy_common2.dogam.service.DogamService;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DogamController {

    private final DogamService dogamService;

    @PostMapping("/friends/dogam")
    public ApiResponseDto<DogamCreateResponseDto> createDogam(@RequestParam(value = "email", required = true) String email , @ModelAttribute DogamCreateRequestDto dto
            , @AuthenticationPrincipal UserDetailsImpl userDetails) throws IOException {

        return ResponseUtils.ok(dogamService.createBoard(dto, email, userDetails.getUser()), MsgType.CREATE_DOGAM_SUCCESSFULLY);
    }
}
