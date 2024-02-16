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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE enforcement set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class Enforcement extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "defender", length = 50, nullable = false)
    private String defender;

    @Column(name = "attacker", length = 50, nullable = false)
    private String attacker;

    @Column(name = "enf_script", length = 255, nullable = false)
    private String enfScript;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "enforcement", cascade = CascadeType.ALL)
    private ItemDealList itemDealList;


    @Builder
    public Enforcement(String attacker, String defender, String enfScript) {

        this.attacker = attacker;
        this.defender = defender;
        this.enfScript = enfScript;
    }

    public static Enforcement of(String attacker, String defender, String enfScript) {

        return builder()
                .attacker(attacker)
                .defender(defender)
                .enfScript(enfScript)
                .build();
    }

    // 연관관계 편의 메서드
    public void addItemDealList(ItemDealList itemDealList) {

        this.itemDealList = itemDealList;
        if (itemDealList.getEnforcement() != this) {
            itemDealList.setEnforcement(this);
        }
    }
}
