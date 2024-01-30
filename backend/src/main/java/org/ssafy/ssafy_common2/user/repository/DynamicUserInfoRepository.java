package org.ssafy.ssafy_common2.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.user.entity.Alias;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;

import java.util.Optional;

public interface DynamicUserInfoRepository extends JpaRepository<DynamicUserInfo,Long> {
    Optional<DynamicUserInfo> findByIdAndDeletedAtIsNull(Long id);
}
