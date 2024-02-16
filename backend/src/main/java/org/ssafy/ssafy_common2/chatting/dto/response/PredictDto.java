package org.ssafy.ssafy_common2.chatting.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PredictDto {
    private int predictWin;
    private int predictLose;
}
