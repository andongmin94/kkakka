package org.ssafy.ssafy_common2.user.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class UserDataService {

    private final UserRepository userRepository;
    private final DynamicUserInfoRepository dynamicUserInfoRepository;

    public int getPoint(User user) {

        return user.getUserInfoId().getPoint();
    }
}
