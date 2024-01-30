package org.ssafy.ssafy_common2.dogam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.dogam.entity.Dogam;

import java.util.List;

public interface DogamRepository extends JpaRepository<Dogam,Long> {
    List<Dogam> findAllByUserIdAndDeletedAtIsNull(Long userId);
}
