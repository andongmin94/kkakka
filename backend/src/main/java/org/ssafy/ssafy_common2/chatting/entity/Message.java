package org.ssafy.ssafy_common2.chatting.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_common2._common.entity.BaseTime;


@Entity
@Getter
@Setter
@RequiredArgsConstructor
@SQLDelete(sql = "UPDATE chat_join set message = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class Message extends BaseTime  {

    public enum MessageType {
        ENTER, QUIT, TALK, CHAT_BOT, WIN ,LOSE
    }

    // 1) 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // 2) 채팅방 타입
    @Column(name = "message_type")
    @Enumerated(EnumType.STRING)
    private MessageType messageType;

    // 3) 내용
    @Column(name = "content", nullable = false)
    private String content;

    // 4) 보낸 사람 & 대화하고 있는 채팅방
    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumns({
//            @JoinColumn(name = "user_id"),
//            @JoinColumn(name = "chat_room_id")
//    })
    private  ChatJoin chatJoin;

    // 5) 채팅방 이미지
    @Column(name="img_code", nullable = true)
    private String imgCode;


    @Builder
    private Message (String content, ChatJoin chatJoin, MessageType messageType, String imgCode){
        this.content = content;
        this.chatJoin = chatJoin;
        this.messageType = messageType;
        this.imgCode = imgCode;
    }

    public static  Message of(String content, ChatJoin chatJoin, MessageType messageType, String imgCode){
        return  builder()
                .content(content)
                .chatJoin(chatJoin)
                .messageType(messageType)
                .imgCode(imgCode)
                .build();
    }

    @Override
    public String toString() {
        return "Message{" +
                "id =" + id +
                ", messageType =" + messageType +
                ", content ='" + content + '\'' +
                ", userId =" + chatJoin.getChatJoinId().getUserId() +
                ", chatRoomId =" + chatJoin.getChatJoinId().getChatRoomId() +
                ", ImgCode =" + imgCode +
                '}';
    }
}
