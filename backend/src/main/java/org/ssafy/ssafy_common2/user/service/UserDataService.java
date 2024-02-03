package org.ssafy.ssafy_common2.user.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2.user.dto.Response.UserDataResponseDto;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class UserDataService {

    private final UserRepository userRepository;
    private final DynamicUserInfoRepository dynamicUserInfoRepository;

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
}
