package org.ssafy.ssafy_common2.itemshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.user.entity.User;

import java.util.Optional;

public interface ItemDealListRepository extends JpaRepository<ItemDealList,Long> {
    Optional<ItemDealList> findByUserAndDeletedAtIsNull(User receiver);

    ItemDealList findByDogamIdAndDeletedAtIsNull(ItemDealList itemDealList);
}
