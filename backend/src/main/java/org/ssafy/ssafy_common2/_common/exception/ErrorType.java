package org.ssafy.ssafy_common2._common.exception;

import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
public enum ErrorType {

    //----------------------- 유저 관련 부분------------------------------
    CONTENT_IS_NULL(400, "입력되지 않은 정보가 있습니다."),
    DUPLICATED_USERID(400, "중복된 아이디입니다."),
    FAILED_TO_ACQUIRE_LOCK(100, "락 권한을 얻는데 실패했습니다."),
    NOT_FOUND_PARK_TYPE(400, "유효하지 않은 값입니다."),
    NOT_FOUND_USER(401, "등록된 사용자가 없습니다."),
    NOT_MATCHING_INFO(401, "아이디 또는 비밀번호를 잘못 입력했습니다."),
    NOT_TOKEN(401, "토큰이 없습니다."),
    NOT_VALID_TOKEN(401, "토큰이 유효하지 않습니다."),
    NOT_FOUND_SANG(401, "김상훈 유저가 없습니다"),
    //---------------------------------------------------------------------
    //--------------------------아이템 샵, 도감 관련 부분 ---------------------------
    NOT_FOUND_ITEM_DEAL_LIST(401,"아이템 거래 내역이 존재하지 않습니다." ),
    NOT_FOUND_ITEM_SHOP(401,"아이템 타입이 존재하지 않습니다." ),
    NOT_FOUND_RECEIVER(401, "받을 유저가 존재하지 않습니다."),
    NOT_ENOUGH_POINT(401, "포인트가 부족합니다"),
    NOT_FOUND_SENDER(401, "보낸 유저가 존재하지 않습니다."),
    NOT_FOUND_DOGAM(401, "도감이 존재하지 않습니다."),
    NOT_MATCHING_DOGAM_USER(401, "유저와 도감이 매치되지 않습니다."),
    DUPLICATED_REQUEST(409, "이미 완료된 요청입니다."),
    //--------------------------------------------------------------------
    //---------------------------채팅방 관련 부분----------------------------
    NO_ONEBYONE_CHAT_ROOM(409,"사용자가 참여한 채팅이 없습니다."),
    NO_CHATTING_ROOM_FOR_U(409, "당신은 친구가 없습니다."),
    FAILED_TO_MAKE_CHATROOM(500, "채팅방 생성에 실패하였습니다."),
    FAILED_TO_BETTING(400,"지금은 베팅을 할 수 있는 시간이 아닙니다."),
    NO_MESSAGES_TO_LOAD(404,"해당 채팅방엔 메세지가 더는 없습니다."),
    NO_LIVE_BROADCAST_ROOM(400,"현재 라이브 중인 중계방이 없습니다!"),
    CANT_CALCULATE_BETTING_POINT(500,"죄송합니다. 배팅 포인트 정산에 문제가 생겼습니다."),
    CANT_LOAD_MESSAGES(500, "메세지를 부를 수 없습니다."),
    THIS_USER_DIDNT_JOIN_IN_THIS_ROOM(500, "해당 유저의 채팅방 참여 기록이 없습니다."),
    //--------------------------------------------------------------------
    //--------------------------도감 및 칭호 부분----------------------------
    NOT_FOUND_ALIAS(401, "칭호가 존재하지 않습니다."),
    NOT_FOUND_COMMENT(401, "댓글을 작성해 주세요"),
    NOT_FOUND_DOGAM_COMMENT(401, "도감 댓글이 존재하지 않습니다."),
    NOT_MATCHING_COMMENT_USER(403, "도감 댓글을 지울수 있는 권한이 없습니다."),
    ALREADY_EXIST_DISLIKE(401, "이미 싫어요를 눌렀습니다. 취소 요청을 하세요"),
    NOT_FOUND_DOGAM_DISLIKE(401, "해당 도감에 싫어요가 존재하지 않습니다."),
    NOT_MATCHING_DISLIKE_USER(403, "도감 싫어요를 취소할 권한이 없습니다."),
    FAILED_TO_DISLKE_DOGAM(401, "본인 도감에 좋아요를 할 수 없습니다"),
    NOT_FOUND_ALARM(401, "잘못된 알림 확인 요청입니다."),
    NOT_FOUND_USER_INFO(401, "다이나믹 유저 인포가 존재하지 않습니다"),
    NOT_FOUND_BACK_IMG(401, "배경사진을 추가해 주세요"),
    NOT_FOUND_PROFILE_IMG(401, "프로필 사진을 추가해 주세요"),
    ALREADY_EXIST_NON_DISLIKE(401, "싫어요가 없습니다. 싫어요를 하고 취소해 주세요"),
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
