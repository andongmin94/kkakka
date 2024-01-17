package org.ssafy.ssafy_common2.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // JPA findBy 규칙
    // select * from user_master where kakao_email = ?
    public User findByKakaoEmail(String kakaoEmail);

    public User findByUserCode(Long userCode);
}