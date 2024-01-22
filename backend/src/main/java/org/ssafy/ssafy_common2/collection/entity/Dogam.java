package org.ssafy.ssafy_common2.collection.entity;

import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Dogam extends ItemDealList {
}
