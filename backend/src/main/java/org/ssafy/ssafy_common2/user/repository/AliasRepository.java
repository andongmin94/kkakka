package org.ssafy.ssafy_common2.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.user.entity.Alias;
import org.ssafy.ssafy_common2.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface AliasRepository extends JpaRepository<Alias,Long> {

    List<Alias> findByUserAndDeletedAtIsNull(User user);

    // UserId로 찾은 것 중 created_at이 가장 최근인 데이터 하나만 가져오기
    Optional<Alias> findFirstByUserIdAndDeletedAtIsNullOrderByCreatedAtDesc(Long userId);
}
