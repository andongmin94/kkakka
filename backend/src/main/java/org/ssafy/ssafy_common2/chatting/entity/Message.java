package org.ssafy.ssafy_common2.chatting.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ssafy.ssafy_common2._common.entity.BaseTime;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class Message extends BaseTime  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "content", nullable = false)
    private String name;

    @ManyToOne
    @MapsId("userId")
    @JoinColumns({
            @JoinColumn(name = "user_id"),
            @JoinColumn(name = "chat_room_id")
    })
    private  ChatJoin chatJoin;

}
