package org.ssafy.ssafy_common2.chatting.entity;

import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;


import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
@Getter
public class ChatJoinId implements Serializable {
    private Long userId;
    private Long chatRoomId;



}
