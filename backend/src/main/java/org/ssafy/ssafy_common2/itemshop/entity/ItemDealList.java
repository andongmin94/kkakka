package org.ssafy.ssafy_common2.itemshop.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_common2._common.entity.BaseTime;
import org.ssafy.ssafy_common2.dogam.entity.Dogam;
import org.ssafy.ssafy_common2.user.entity.Alias;
import org.ssafy.ssafy_common2.user.entity.User;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE item_deal_list set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dogam_id")
    public Dogam dogam;

    @Setter
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alias_id")
    public Alias alias;

    @Setter
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enforcement_id")
    public Enforcement enforcement;

    @Setter
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "megaphone_id")
    public Megaphone megaphone;

    public void setDogam(Dogam dogam) {
        if (this.dogam != null) {
            this.dogam.setItemDealList(null);
        }
        this.dogam = dogam;
        if (!(dogam.getItemDealList() == this)) {
            dogam.addItemDealList(this);
        }
    }

    @Builder
    private ItemDealList(User user, ItemShop itemType) {

        this.user = user;
        this.itemType = itemType;
    }

    public static ItemDealList of(User user, ItemShop itemType) {

        return builder()
                .user(user)
                .itemType(itemType)
                .build();
    }
}
