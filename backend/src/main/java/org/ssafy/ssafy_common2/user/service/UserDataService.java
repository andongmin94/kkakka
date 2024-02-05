package org.ssafy.ssafy_common2.user.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.service.S3Uploader;
import org.ssafy.ssafy_common2.user.dto.Request.UserBackImgRequestDto;
import org.ssafy.ssafy_common2.user.dto.Response.UserDataResponseDto;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class UserDataService {

    private final UserRepository userRepository;
    private final DynamicUserInfoRepository dynamicUserInfoRepository;
    private final S3Uploader s3Uploader;

    public Map<String, Integer> getPoint(User user) {

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        Map<String, Integer> map = new HashMap<>();
        map.put("Point", user.getUserInfoId().getPoint());
        return map;
    }

    public UserDataResponseDto getEmailProfileImg(User user) {

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        boolean isBankrupt = false;
        if (user.getUserInfoId().getPoint() == 0 && user.getUserInfoId().getIsBetting() == 0) {
            isBankrupt = true;
        }

        UserDataResponseDto dto = UserDataResponseDto.of(user.getId(), user.getUserName(), user.getKakaoEmail(), user.getKakaoProfileImg(),
                user.getUserInfoId().getBackImg(), user.getUserInfoId().getCurAlias(), isBankrupt);
        return dto;
    }

    public void updateUserBackImg(User user, UserBackImgRequestDto dto) throws IOException {

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        DynamicUserInfo dynamicUserInfo = dynamicUserInfoRepository.findByIdAndDeletedAtIsNull(user.getId()).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_USER_INFO)
        );

        // imgURL을 만들어서 S3에 저장 시작
        String imgUrl = "";
        System.out.println(dto.getBackImg());
        if (dto.getBackImg() == null) {
            throw new CustomException(ErrorType.NOT_FOUND_BACK_IMG);
        } else {
            imgUrl = s3Uploader.upload(dto.getBackImg());
        }
        // imgURL을 만들어서 S3에 저장 끝
        dynamicUserInfo.updateBackImg(imgUrl);
    }

    public UserDataResponseDto getUserData(Long userId, User user) {

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        User curUser = userRepository.findByIdAndDeletedAtIsNull(userId).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_USER)
        );


        boolean isBankrupt = false;
        if (curUser.getUserInfoId().getPoint() == 0 && curUser.getUserInfoId().getIsBetting() == 0) {
            isBankrupt = true;
        }

        UserDataResponseDto dto = UserDataResponseDto.of(curUser.getId(), curUser.getUserName(), curUser.getKakaoEmail(), curUser.getKakaoProfileImg(),
                curUser.getUserInfoId().getBackImg(), curUser.getUserInfoId().getCurAlias(), isBankrupt);
        return dto;
    }
}
