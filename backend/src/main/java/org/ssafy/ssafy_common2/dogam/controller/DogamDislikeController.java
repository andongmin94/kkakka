package org.ssafy.ssafy_common2.dogam.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.dogam.service.DogamDislikeService;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DogamDislikeController {

    private final DogamDislikeService dogamDislikeService;

    @PostMapping("/friends/dogam/hate/{dogam-id}")
    public ApiResponseDto<Void> createDogamDislike(@PathVariable(name = "dogam-id") Long dogamID, @AuthenticationPrincipal UserDetailsImpl userDetails) throws IOException {

        dogamDislikeService.createDogamDislike(dogamID,userDetails.getUser());
        return ResponseUtils.ok(MsgType.CREATE_DOGAM_DISLIKE_SUCCESSFULLY);
    }

    @DeleteMapping("/friends/dogam/hate/{hate-id}")
    public ApiResponseDto<Void> deleteDogamDislike(@PathVariable(value = "hate-id") Long hateId, @AuthenticationPrincipal UserDetailsImpl userDetails) {

        dogamDislikeService.deleteDogamDislike(hateId, userDetails.getUser());
        return ResponseUtils.ok(MsgType.DELETE_DOGAM_COMMENT_SUCCESSFULLY);
    }
}
