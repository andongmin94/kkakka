package org.ssafy.ssafy_common2.user.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.service.S3Uploader;
import org.ssafy.ssafy_common2.user.dto.Request.UserProfileRequestDto;
import org.ssafy.ssafy_common2.user.dto.Response.UserDataResponseDto;
import org.ssafy.ssafy_common2.user.dto.Response.UserProfileEditResponseDto;
import org.ssafy.ssafy_common2.user.dto.Response.UserProfileResponseDto;
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
                user.getUserInfoId().getBackImg(), user.getUserInfoId().getCurAlias(), isBankrupt, user.getRiotId());
        return dto;
    }

    public UserProfileResponseDto updateUserProfile(User user, UserProfileRequestDto dto) throws IOException {

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        DynamicUserInfo dynamicUserInfo = dynamicUserInfoRepository.findByIdAndDeletedAtIsNull(user.getId()).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_USER_INFO)
        );

        // imgURL을 만들어서 S3에 저장 시작
        String backImgUrl = "";
        if (dto.getBackImg() != null) {
            if (!dto.getBackImg().isEmpty()) {
                backImgUrl = s3Uploader.upload(dto.getBackImg());
                dynamicUserInfo.updateBackImg(backImgUrl);
            } else {
                System.out.println("배경 화면이 비었다");
            }
        }

        String profileImgUrl = "";
        if (dto.getProfileImg() != null) {
            if (!dto.getProfileImg().isEmpty()) {
                profileImgUrl = s3Uploader.upload(dto.getProfileImg());
                user.updateProfileImg(profileImgUrl);
            }
        }

        // imgURL을 만들어서 S3에 저장 끝
        if (dto.getRiotId()!= null) {
            if(!dto.getRiotId().isEmpty()) {
                user.updateRiotId(dto.getRiotId());
            }
        }
        System.out.println("배경 이미지 이름 : " + dto.getBackImg());
        System.out.println("프로필 이미지 dto : " + dto.getProfileImg());
        System.out.println("라이엇 아이디 : " + dto.getRiotId());
        userRepository.saveAndFlush(user);
        UserProfileResponseDto ans = UserProfileResponseDto.of(profileImgUrl, backImgUrl, dto.getRiotId());
        return ans;
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
                curUser.getUserInfoId().getBackImg(), curUser.getUserInfoId().getCurAlias(), isBankrupt, curUser.getRiotId());
        return dto;
    }

    public UserProfileEditResponseDto getProfileEdit(User user) {

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        UserProfileEditResponseDto dto = UserProfileEditResponseDto.of(user.getKakaoProfileImg(), user.getUserInfoId().getBackImg(), user.getRiotId());
        return dto;
    }

    public UserDataResponseDto searchFriends(User user, String userEmail) {

        System.out.println("유저 이메일 : " + userEmail);

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        User friend = userRepository.findByKakaoEmailAndDeletedAtIsNull(userEmail).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_USER)
        );

        DynamicUserInfo dynamicUserInfo = dynamicUserInfoRepository.findByIdAndDeletedAtIsNull(friend.getId()).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_USER_INFO)
        );

        boolean isBankrupt = false;
        if (dynamicUserInfo.getPoint() == 0 && dynamicUserInfo.getIsBetting() == 0) {
            isBankrupt = true;
        }

        UserDataResponseDto dto = UserDataResponseDto.of(friend.getId(), friend.getUserName(), friend.getUserName(), friend.getKakaoProfileImg(), dynamicUserInfo.getBackImg(),
                dynamicUserInfo.getCurAlias(), isBankrupt, friend.getRiotId());

        return dto;
    }
}
