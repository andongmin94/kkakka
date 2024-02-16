package org.ssafy.ssafy_common2.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_common2._common.entity.BaseTime;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE alias set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class Alias extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "alias_name", length = 50, nullable = false)
    private String aliasName;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "alias", cascade = CascadeType.ALL)
    private ItemDealList itemDealList;

    @Builder
    public Alias(User user, String aliasName) {

        this.user = user;
        this.aliasName = aliasName;
    }

    public static Alias of(User user, String aliasName){

        return builder()
                .user(user)
                .aliasName(aliasName)
                .build();
    }

    // 연관관계 편의 메소드
    public void addItemDealList(ItemDealList itemDealList) {

        this.itemDealList = itemDealList;
        if (itemDealList.getAlias() != this){
            itemDealList.setAlias(this);
        }
    }

}
