package org.ssafy.ssafy_common2.itemshop.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.ssafy.ssafy_common2.itemshop.entity.Enforcement;

import java.util.Optional;

public interface EnforcementRepository extends JpaRepository<Enforcement,Long> {

    // defender가 채팅 치는 사람
    // attacker가 방 주인
    @Query(value = "SELECT enf_script FROM "
            +"(SELECT * FROM enforcement enf2 "
            +"WHERE enf2.attacker = "
            +"(SELECT u2.kakao_email FROM users u2 WHERE u2.kakao_email = :chatOwnerEmail )) temp "
            +"WHERE temp.defender = :attenderEmail ORDER BY RAND() LIMIT 1 ",nativeQuery = true)
    Optional<String> findTopByDefenderAndAttackerOrderByCreatedAtDesc(
        @Param("chatOwnerEmail") String chatOwnerEmail,
        @Param("attenderEmail") String attenderEmail
    );
}
