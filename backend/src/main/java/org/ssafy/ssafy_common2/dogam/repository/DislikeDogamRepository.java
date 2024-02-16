package org.ssafy.ssafy_common2.dogam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.dogam.entity.DislikeDogam;

import java.util.List;
import java.util.Optional;

public interface DislikeDogamRepository extends JpaRepository<DislikeDogam,Long> {
    int countByDogamIdAndIsDislikeTrueAndDeletedAtIsNull(Long id);

    Optional<DislikeDogam> findByUserEmailAndDogamIdAndDeletedAtIsNull(String kakaoEmail, Long id);

    Optional<DislikeDogam> findByIdAndDeletedAtIsNull(Long dislikeId);

    List<DislikeDogam> findAllByDogamIdAndDeletedAtIsNull(Long dogamId);
}
