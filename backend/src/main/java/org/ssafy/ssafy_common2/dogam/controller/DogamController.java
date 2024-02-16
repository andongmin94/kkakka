package org.ssafy.ssafy_common2.dogam.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.dogam.dto.response.*;
import org.ssafy.ssafy_common2.dogam.dto.reqeust.DogamCreateRequestDto;
import org.ssafy.ssafy_common2.dogam.service.DogamService;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DogamController {

    private final DogamService dogamService;

    @GetMapping("/friends/dogam")
    public ApiResponseDto<PaginationResponse<DogamMainListResponseDto>> dogamList(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ResponseUtils.ok(dogamService.getDogamListWithPagination(userDetails.getUser(), page, size), MsgType.SEARCH_MAIN_DOGAM_LIST_SUCCESSFULLY);
    }


    @PostMapping("/friends/dogam")
    public ApiResponseDto<DogamCreateResponseDto> createDogam(@RequestParam(value = "friends-user-id", required = true) Long friendId, @ModelAttribute DogamCreateRequestDto dto
            , @AuthenticationPrincipal UserDetailsImpl userDetails) throws IOException {

        return ResponseUtils.ok(dogamService.createDogam(dto, friendId, userDetails.getUser()), MsgType.CREATE_DOGAM_SUCCESSFULLY);
    }

    @DeleteMapping("/friends/dogam/{dogam-id}")
    public ApiResponseDto<Map<String, Integer>> deleteDogam(@PathVariable(value = "dogam-id") Long dogamId, @AuthenticationPrincipal UserDetailsImpl userDetails) {

        return ResponseUtils.ok(dogamService.deleteDogam(dogamId, userDetails.getUser()), MsgType.DELETE_DOGAM_SUCCESSFULLY);
    }

    @GetMapping("/friends/dogam/{dogam-id}")
    public ApiResponseDto<DogamDetailResponseDto> dogamDetail(@PathVariable(value = "dogam-id") Long dogamId, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseUtils.ok(dogamService
                .dogamDetail(dogamId, userDetails.getUser()), MsgType.SEARCH_DOGAM_DETAIL_SUCCESSFULLY);
    }

    @GetMapping("/friends/dogam/users/{user-id}")
    public ApiResponseDto<PaginationResponse<DogamProfileListResponseDto>> dogamProfileList(
            @PathVariable(value = "user-id") Long userId,
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ResponseUtils.ok(dogamService
                .dogamProfileList(userId, userDetails.getUser(),page,size), MsgType.SEARCH_PROFILE_DOGAM_LIST_SUCCESSFULLY);
    }
}
