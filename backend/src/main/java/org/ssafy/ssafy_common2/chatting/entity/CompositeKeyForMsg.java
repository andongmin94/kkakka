package org.ssafy.ssafy_common2.chatting.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class CompositeKeyForMsg implements Serializable {
    private String userId;
    @Column(name = "chat_room_id")
    private String chatRoomId;


}
