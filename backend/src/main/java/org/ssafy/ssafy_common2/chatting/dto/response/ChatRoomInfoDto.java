package org.ssafy.ssafy_common2.chatting.dto.response;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomInfoDto {

    private Long friendId;
    private Long roomId;
    private ChatRoom.ChatRoomType chatRoomType;
    private String friendName;
    private String friendEmail;
    private String friendImgUrl;
    private boolean isLogin;
    private String friendAlias;
    private String lastMessage;
    private LocalDateTime lastWrittenMessageTime;
    private int unreadMessageCnt;
    private boolean tenMinute;
    private List<CrowdDto> crowdDtoList;

    @Builder
    private ChatRoomInfoDto (Long friendId,Long roomId, ChatRoom.ChatRoomType chatRoomType, String friendName, String friendEmail, String friendImgUrl,
                             boolean isLogin, String friendAlias, String lastMessage, LocalDateTime lastWrittenMessageTime,
                             int unreadMessageCnt, boolean tenMinute){

        this.friendId = friendId;
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
        this.tenMinute = tenMinute;
    }

    public static ChatRoomInfoDto of (Long friendId, Long roomId,ChatRoom.ChatRoomType chatRoomType, String friendName, String friendEmail, String friendImgUrl,
                                      boolean isLogin, String friendAlias, String lastMessage, LocalDateTime lastWrittenMessageTime,
                                      int unreadMessageCnt, boolean tenMinute){
        return builder()
                .friendId(friendId)
                .roomId(roomId)
                .chatRoomType(chatRoomType)
                .friendName(friendName)
                .friendEmail(friendEmail)
                .friendImgUrl(friendImgUrl)
                .friendAlias(friendAlias)
                .isLogin(isLogin)
                .lastMessage(lastMessage)
                .lastWrittenMessageTime(lastWrittenMessageTime)
                .unreadMessageCnt(unreadMessageCnt)
                .tenMinute(tenMinute)
                .build();

    }

}
