package org.ssafy.ssafy_common2.chatting.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class LiveBroadcastListDto {

    private long playerId;
    private String playerEmail;
    private String playerName;
    private String playerAlias;
    private String playerProfilePic;
    private String playerBackgroundPic;
    private long roomId;
    private String roomTitle;
    private List<CrowdDto> crowdDtoList;

}
