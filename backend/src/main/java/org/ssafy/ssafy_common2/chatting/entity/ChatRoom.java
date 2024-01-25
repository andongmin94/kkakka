package org.ssafy.ssafy_common2.chatting.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ssafy.ssafy_common2._common.entity.BaseTime;

import java.io.Serializable;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom extends BaseTime {

    private static final long serialVersionUID = 6494678977089006639L;

    public enum ChatRoomType {
        ONE, MANY, DEAD
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private ChatRoom(Long id, ChatRoomType chatRoomType, String chatOwnerName, String chatOwnerEmail){
        this.id = id;
        this.chatRoomType = chatRoomType;
        this.chatOwnerName = chatOwnerName;
        this.chatOwnerEmail = chatOwnerEmail;
    }

    public static ChatRoom of (Long id, ChatRoomType chatRoomType, String chatOwnerName, String chatOwnerEmail){
        return builder()
                .id(id)
                .chatRoomType(chatRoomType)
                .chatOwnerName(chatOwnerName)
                .chatOwnerEmail(chatOwnerEmail)
                .build();
    }




}
