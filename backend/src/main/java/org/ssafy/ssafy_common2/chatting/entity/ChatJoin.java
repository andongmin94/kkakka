package org.ssafy.ssafy_common2.chatting.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.ssafy.ssafy_common2._common.entity.BaseTime;
import org.ssafy.ssafy_common2.user.entity.User;


@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE chat_join set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class ChatJoin extends BaseTime  {


    // 1) 복합키 설정
    @EmbeddedId
    private ChatJoinId chatJoinId;


    // 2) 복합키 중 하나가 User의 FK임을 설정
    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name ="user_id", referencedColumnName = "id")
    private User user;

    // 3) 복합키 중 하나가 Chat_Room의 FK임을 설정
    @MapsId("chatRoomId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "chat_room_id", referencedColumnName = "id")
    private ChatRoom chatRoom;

    @Column(name = "bet_price", nullable = true)
    private int betPrice;

    @Column(name = "is_win", nullable = true)
    private boolean isWin;

    @Builder
    private ChatJoin (ChatJoinId chatJoinId,User user, ChatRoom chatRoom ,int betPrice, boolean isWin) {
         this.chatJoinId = chatJoinId;
         this.user = user;
         this.chatRoom =chatRoom;
         this.betPrice =betPrice;
         this.isWin = isWin;
    }

    public static ChatJoin of(ChatJoinId chatJoinId,User user, ChatRoom chatRoom ,int betPrice, boolean isWin){
        return builder()
                .chatJoinId(chatJoinId)
                .user(user)
                .chatRoom(chatRoom)
                .betPrice(betPrice)
                .isWin(isWin)
                .build();
    }

    @Override
    public String toString() {
        return "ChatJoin{" +
                "chatJoinId=" + chatJoinId +
                ", user=" + user +
                ", chatRoom=" + chatRoom +
                ", betPrice=" + betPrice +
                ", isWin=" + isWin +
                '}';
    }
}

/*
* 2) @MapsId("복합키 중 하나의 이름") -> 해당 테이블에서 추출한 FK가 복합 키 중 무엇인지 기록
*    @ManytoOne -> 어노테이션이 적히는 입장에서 다 대 1임을 나타내는 것
*
* 3) @MapsId("현재 테이블의 복합키 변수 중 하나")
*    @해당 테이블과 참조 테이블의 관계
*    @JoinColumn(name ="해당 테이블 내에 적힐 컬럼의 이름")
*    FK를 추출할 클래스 객체
*
*    이렇게 하면 FK를 추출할 클래스의 FK를 MapsId에 적힌 복합키 변수 중 하나로 맵핑
* */