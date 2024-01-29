package org.ssafy.ssafy_common2.dogam.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.dogam.dto.reqeust.DogamCommentCreateRequestDto;
import org.ssafy.ssafy_common2.dogam.dto.response.DogamCommentResponseDto;
import org.ssafy.ssafy_common2.dogam.service.DogamCommentService;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DogamCommentController {

    private final DogamCommentService dogamCommentService;

    @PostMapping("/friends/dogam/comment/{dogam-id}")
    public ApiResponseDto<DogamCommentResponseDto> createDogam(@PathVariable(name = "dogam-id") Long dogamID , @RequestBody DogamCommentCreateRequestDto dto
            , @AuthenticationPrincipal UserDetailsImpl userDetails) throws IOException {

        return ResponseUtils.ok(dogamCommentService.createDogamComment(dto, dogamID, userDetails.getUser()), MsgType.CREATE_DOGAM_SUCCESSFULLY);
    }
}
