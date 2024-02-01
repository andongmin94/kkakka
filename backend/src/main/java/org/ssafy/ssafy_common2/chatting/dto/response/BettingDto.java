package org.ssafy.ssafy_common2.chatting.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BettingDto {

   private PredictDto predictDto;
   private int myBettingPoint;
   private String myChosenTeam;

}
