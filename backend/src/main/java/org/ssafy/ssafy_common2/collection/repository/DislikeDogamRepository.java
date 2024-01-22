package org.ssafy.ssafy_common2.collection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.collection.entity.CommentDogam;
import org.ssafy.ssafy_common2.collection.entity.DislikeDogam;

public interface DislikeDogamRepository extends JpaRepository<DislikeDogam,Long> {
}
