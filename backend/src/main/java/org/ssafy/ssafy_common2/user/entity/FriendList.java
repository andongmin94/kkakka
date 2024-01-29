package org.ssafy.ssafy_common2.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_common2._common.entity.BaseTime;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE friend_list set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class FriendList extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender", nullable = false)
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver", nullable = false)
    private User receiver;

    @Column(name = "is_check", nullable = false)
    private Boolean isCheck = false;

    @Builder
    private FriendList(User sender, User receiver, Boolean isCheck){

        this.sender = sender;
        this.receiver = receiver;
        this.isCheck = isCheck;
    }

    public static FriendList of(User sender, User receiver, Boolean isCheck){

        return builder()
                .sender(sender)
                .receiver(receiver)
                .isCheck(isCheck)
                .build();
    }

    public void updateIsCheck(Boolean isCheck){
        this.isCheck = isCheck;
    }

}
