package org.ssafy.ssafy_common2.chatting.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PlayerEvent {
    String summonerName;
    String championName;
    Long level;
    Long kills;
    Long deaths;
    Long assists;
    Long cs;
    Long wards;
}
