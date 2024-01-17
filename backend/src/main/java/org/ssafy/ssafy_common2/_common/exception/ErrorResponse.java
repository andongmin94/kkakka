package org.ssafy.ssafy_common2._common.exception;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

@Getter
public class ErrorResponse {

    private int status;
    private String msg;

    @Builder
    private ErrorResponse(int status, String msg) {
        this.status = status;
        this.msg = msg;
    }

    public static ErrorResponse of(ErrorType errorType) {
        return ErrorResponse.builder()
                .status(errorType.getCode())
                .msg(errorType.getMsg())
                .build();
    }

    public static ErrorResponse of(String msg){
        return ErrorResponse.builder()
                .status(400)
                .msg(msg)
                .build();
    }

    public static ErrorResponse of(String msg, int status){
        return ErrorResponse.builder()
                .status(status)
                .msg(msg)
                .build();
    }

    public static ErrorResponse of(BindingResult bindingResult) {
        String message = "";

        if (bindingResult.hasErrors()) {
            message = bindingResult.getAllErrors().get(0).getDefaultMessage();
        }

        return ErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .msg(message)
                .build();
    }

}
