package org.ssafy.ssafy_common2.itemshop.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ssafy.ssafy_common2._common.entity.BaseTime;
import org.ssafy.ssafy_common2.user.entity.User;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemDealList extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_type", nullable = false)
    private ItemShop itemType;

    @Builder
    public ItemDealList(Long id, User user, ItemShop itemType) {
        this.id = id;
        this.user = user;
        this.itemType = itemType;
    }
}
