package org.ssafy.ssafy_common2.user.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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
        Map<String, Integer> map = new HashMap<>();
        map.put("Point", user.getUserInfoId().getPoint());
        return map;
    }

    public Map<String, String> getEmail(User user) {

        Map<String, String> map = new HashMap<>();
        map.put("Email", user.getKakaoEmail());
        return map;
    }
}
