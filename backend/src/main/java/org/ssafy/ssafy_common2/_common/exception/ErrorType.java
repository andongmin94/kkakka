package org.ssafy.ssafy_common2._common.exception;

import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
public enum ErrorType {

    CONTENT_IS_NULL(400, "입력되지 않은 정보가 있습니다."),
    DUPLICATED_USERID(400, "중복된 아이디입니다."),
    FAILED_TO_ACQUIRE_LOCK(100, "락 권한을 얻는데 실패했습니다."),
    NOT_FOUND_PARK_TYPE(400, "유효하지 않은 값입니다."),
    NOT_FOUND_USER(401, "등록된 사용자가 없습니다."),
    NOT_MATCHING_INFO(401, "아이디 또는 비밀번호를 잘못 입력했습니다."),
    NOT_TOKEN(401, "토큰이 없습니다."),
    NOT_VALID_TOKEN(401, "토큰이 유효하지 않습니다."),
    NOT_FOUND_ITEM_DEAL_LIST(401,"아이템 거래 내역이 존재하지 않습니다." ),
    NOT_FOUND_ITEM_SHOP(401,"아이템 타입이 존재하지 않습니다." ),
    NOT_FOUND_RECEIVER(401, "받을 유저가 존재하지 않습니다."),
    NOT_ENOUGH_POINT(401, "포인트가 부족합니다"),
    NOT_FOUND_SENDER(401, "보낸 유저가 존재하지 않습니다."),
    NOT_FOUND_DOGAM(401, "도감이 존재하지 않습니다."),
    NOT_MATCHING_DOGAM_USER(401, "유저와 도감이 매치되지 않습니다."),
    DUPLICATED_REQUEST(409, "이미 완료된 요청입니다."),
    FAILED_TO_MAKE_CHATROOM(500, "채팅방 생성에 실패하였습니다.")
    ;

    private int code;
    private String msg;

    ErrorType(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public static ErrorType printLocalDateTimeList(List<LocalDateTime> notAllowedTimeList) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        List<String> dateTimeStrings = notAllowedTimeList.stream()
                .map(dateTime -> dateTime.format(formatter))
                .toList();

        ErrorType errorType = FAILED_TO_ACQUIRE_LOCK;
        errorType.msg = "입차 불가한 시간대가 있습니다.\n" + dateTimeStrings;
        return errorType;
    }
}
