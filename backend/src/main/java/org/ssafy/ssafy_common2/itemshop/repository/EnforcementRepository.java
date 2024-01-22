package org.ssafy.ssafy_common2.itemshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.collection.entity.Dogam;
import org.ssafy.ssafy_common2.itemshop.entity.Enforcement;

public interface EnforcementRepository extends JpaRepository<Enforcement,Long> {
}
