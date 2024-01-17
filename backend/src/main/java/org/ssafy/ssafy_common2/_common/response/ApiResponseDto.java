package org.ssafy.ssafy_common2._common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import org.ssafy.ssafy_common2._common.exception.ErrorResponse;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponseDto<T> {

    private T data;
    private String msg;
    private ErrorResponse error;

    @Builder
    public ApiResponseDto(T data, String msg, ErrorResponse error) {
        this.data = data;
        this.msg = msg;
        this.error = error;
    }
}
