package org.ssafy.ssafy_common2.chatting.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class LiveBroadcastListDto {

    private String playerEmail;
    private String playerName;
    private String playerKakaoImg;
    private long roomId;
    private String roomTitle;
    private List<CrowdDto> crowdDtoList;

}
