package org.ssafy.ssafy_common2.itemshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.ssafy_common2.itemshop.entity.Enforcement;
import org.ssafy.ssafy_common2.itemshop.entity.ItemShop;

import java.util.List;
import java.util.Optional;

public interface ItemShopRepository extends JpaRepository<ItemShop,Long> {
    Optional<ItemShop> findByItemNameAndDeletedAtIsNull(String type);
    List<ItemShop> findAllByDeletedAtIsNull();
}
