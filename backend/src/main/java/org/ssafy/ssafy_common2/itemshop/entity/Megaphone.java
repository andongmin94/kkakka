package org.ssafy.ssafy_common2.itemshop.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_common2._common.entity.BaseTime;

@Entity
@Getter
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE megaphone set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class Megaphone extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "content", length = 100, nullable = false)
    private String content;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "megaphone", cascade = CascadeType.ALL)
    private ItemDealList itemDealList;

    @Builder
    private Megaphone(String content) {
        this.content = content;
    }

    public static Megaphone of(String content) {
        return builder()
                .content(content)
                .build();
    }

    public void addItemDealList(ItemDealList itemDealList) {
        this.itemDealList = itemDealList;
        if(itemDealList.getMegaphone() != this) {
            itemDealList.setMegaphone(this);
        }
    }
}
