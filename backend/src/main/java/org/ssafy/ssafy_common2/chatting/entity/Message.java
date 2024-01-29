package org.ssafy.ssafy_common2.chatting.entity;

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
@SQLDelete(sql = "UPDATE chat_join set message = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class Message extends BaseTime  {

    // 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // 내용
    @Column(name = "content", nullable = false)
    private String name;

    // 보낸 사람 & 대화하고 있는 채팅방
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumns({
            @JoinColumn(name = "user_id"),
            @JoinColumn(name = "chat_room_id")
    })
    private  ChatJoin chatJoin;

    @Builder
    private Message (String name, ChatJoin chatJoin){
        this.name = name;
        this.chatJoin = chatJoin;
    }

    public static  Message of(String name, ChatJoin chatJoin){
        return  builder()
                .name(name)
                .chatJoin(chatJoin)
                .build();
    }

}
