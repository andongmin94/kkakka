package org.ssafy.ssafy_common2.chatting.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ChatMessageDto {

    // 메세지 타입
    private String messageType;

    // 메세지 내용
    private String content;

    // 보낸 이
    private long userId;

    // 메세지가 보내진 채팅방
    private long chatRoomId;

    // 메세지 생성 시간
    private LocalDateTime createdAt;

    // 메세지 수정 시간
    private LocalDateTime updateAt;

    // Base64로 이미지 받음
    private String imgCode;


    @Builder
    private ChatMessageDto(String messageType, String content, long userId, long chatRoomId,
                           LocalDateTime createdAt, LocalDateTime updateAt, String imgCode){
        this.messageType = messageType;
        this.content = content;
        this.userId = userId;
        this.chatRoomId = chatRoomId;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
        this.imgCode = imgCode;
    }

    public static ChatMessageDto of (String messageType, String content, long userId, long chatRoomId,
                                     LocalDateTime createdAt, LocalDateTime updateAt, String imgCode){
        return  builder().messageType(messageType)
                .content(content)
                .userId(userId)
                .chatRoomId(chatRoomId)
                .createdAt(createdAt)
                .updateAt(updateAt)
                .imgCode(imgCode)
                .build();
    }



    @Override
    public String toString() {
        return "ChatMessageDto{" +
                "messageType='" + messageType + '\'' +
                ", content='" + content + '\'' +
                ", userId=" + userId +
                ", chatRoomId=" + chatRoomId +
                ", createdAt=" + createdAt +
                ", updateAt=" + updateAt +
                ", imageCode=" + imgCode +
                '}';
    }
}
