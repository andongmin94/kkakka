package org.ssafy.ssafy_common2.chatting.dto.response;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomInfoDto {

    private long roomId;
    private ChatRoom.ChatRoomType chatRoomType;
    private String friendName;
    private String friendEmail;
    private String friendImgUrl;
    private boolean isLogin;
    private String friendAlias;
    private String lastMessage;
    private LocalDateTime lastWrittenMessageTime;
    private int unreadMessageCnt;

    @Builder
    private ChatRoomInfoDto (long roomId, ChatRoom.ChatRoomType chatRoomType, String friendName, String friendEmail, String friendImgUrl,
                             boolean isLogin, String friendAlias, String lastMessage, LocalDateTime lastWrittenMessageTime,
                             int unreadMessageCnt){


        this.roomId = roomId;
        this.chatRoomType = chatRoomType;
        this.friendName = friendName;
        this.friendEmail = friendEmail;
        this.friendImgUrl = friendImgUrl;
        this.isLogin = isLogin;
        this.friendAlias = friendAlias;
        this.lastMessage = lastMessage;
        this.lastWrittenMessageTime = lastWrittenMessageTime;
        this.unreadMessageCnt = unreadMessageCnt;
    }

    public static ChatRoomInfoDto of (long roomId,ChatRoom.ChatRoomType chatRoomType, String friendName, String friendEmail, String friendImgUrl,
                                      boolean isLogin, String friendAlias, String lastMessage, LocalDateTime lastWrittenMessageTime,
                                      int unreadMessageCnt){
        return builder().roomId(roomId)
                .chatRoomType(chatRoomType)
                .friendName(friendName)
                .friendEmail(friendEmail)
                .friendImgUrl(friendImgUrl)
                .friendAlias(friendAlias)
                .isLogin(isLogin)
                .lastMessage(lastMessage)
                .lastWrittenMessageTime(lastWrittenMessageTime)
                .unreadMessageCnt(unreadMessageCnt)
                .build();

    }

}
