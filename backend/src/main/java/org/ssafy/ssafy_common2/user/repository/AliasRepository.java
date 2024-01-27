package org.ssafy.ssafy_common2.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.user.entity.Alias;
import org.ssafy.ssafy_common2.user.entity.User;

import java.util.List;

public interface AliasRepository extends JpaRepository<Alias,Long> {

    List<Alias> findByUserAndDeletedAtIsNull(User user);
}
