package org.ssafy.ssafy_common2.itemshop.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ssafy.ssafy_common2._common.entity.BaseTime;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemShop extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "item_name", nullable = false, length = 20)
    String itemName;

    @Column(name = "item_price", nullable = false)
    int itemPrice;

    @Column(name = "item_desc", nullable = false, length = 255)
    String itemDesc;

    @Builder
    private ItemShop(String itemName, int itemPrice, String itemDesc) {

        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemDesc = itemDesc;
    }

}
