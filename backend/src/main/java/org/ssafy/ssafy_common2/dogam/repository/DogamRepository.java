package org.ssafy.ssafy_common2.dogam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.dogam.entity.Dogam;

import java.util.List;
import java.util.Optional;

public interface DogamRepository extends JpaRepository<Dogam,Long> {
    List<Dogam> findAllByUserIdAndDeletedAtIsNull(Long userId);

    Optional<Dogam> findByIdAndDeletedAtIsNull(Long dogamId);
}
