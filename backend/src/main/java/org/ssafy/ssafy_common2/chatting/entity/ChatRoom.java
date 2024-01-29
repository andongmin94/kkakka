package org.ssafy.ssafy_common2.chatting.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_common2._common.entity.BaseTime;

import java.io.Serializable;


@Entity
@Getter
@Setter
@NoArgsConstructor
@SQLDelete(sql = "UPDATE chat_room set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class ChatRoom extends BaseTime implements Serializable {

    private static final long serialVersionUID = 6494678977089006639L;

    public enum ChatRoomType {
        ONE, MANY, DEAD
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 1)
    @Column(name = "id")
    private Long id;

    @Column(name = "chat_room_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ChatRoomType chatRoomType;

    @Column(name = "chat_owner_name", nullable = false, length = 15)
    private String chatOwnerName;

    @Column(name = "chat_owner_email", nullable = false, length = 50)
    private String chatOwnerEmail;

    @Builder
    private ChatRoom( ChatRoomType chatRoomType, String chatOwnerName, String chatOwnerEmail){
        this.chatRoomType = chatRoomType;
        this.chatOwnerName = chatOwnerName;
        this.chatOwnerEmail = chatOwnerEmail;
    }

    public static ChatRoom of ( ChatRoomType chatRoomType, String chatOwnerName, String chatOwnerEmail){
        return builder()
                .chatRoomType(chatRoomType)
                .chatOwnerName(chatOwnerName)
                .chatOwnerEmail(chatOwnerEmail)
                .build();
    }
}

/*
* 1) 기본키 생성을 DB에 위임
* */
