package org.ssafy.ssafy_common2._common.response;

import lombok.Getter;

@Getter
public enum MsgType {

    SIGNUP_SUCCESSFULLY("회원가입이 완료되었습니다."),
    LOGIN_SUCCESSFULLY("로그인이 완료되었습니다."),
    SEARCH_SUCCESSFULLY("조회 성공"),
    DATA_SUCCESSFULLY("데이터 생성 성공"),
    GENERATE_TOKEN_SUCCESSFULLY("토큰 생성 성공"),
    CREATE_DOGAM_SUCCESSFULLY("도감 생성 성공"),
    DELETE_DOGAM_SUCCESSFULLY("도감 삭제 성공"),
    SEARCH_MAIN_DOGAM_LIST_SUCCESSFULLY("메인 도감 리스트 생성 성공"),
    DELETE_DOGAM_COMMENT_SUCCESSFULLY("도감 댓글 삭제 성공"),
    CREATE_DOGAM_COMMENT_SUCCESSFULLY("도감 댓글 생성 성공"),
    CREATE_DOGAM_DISLIKE_SUCCESSFULLY("도감 싫어요 생성 성공"),
    UPDATE_ALARM_SUCCESSFULLY("알림 확인 성공"),
    UPDATE_ALARM_EVENT_ID_SUCCESSFULLY("알림 LastEventID 갱신 성공"),
    SEARCH_DOGAM_DETAIL_SUCCESSFULLY("도감 디테일 조회 성공"),
    SEARCH_POINT_SUCCESSFULLY("포인트 조회 성공"),
    SEARCH_EMAIL_SUCCESSFULLY("이메일 조회 성공"),
    SEARCH_MY_PROFILE_DATA_SUCCESSFULLY("본인 프로필 데이터 조회 성공"),
    SEND_FRIEND_REQUEST_SUCCESSFULLY("친구 요청 성공"),
    RECEIVE_FRIEND_REQUEST_SUCCESSFULLY("친구 요청 수락 성공"),
    CANCEL_FRIEND_REQUEST_SUCCESSFULLY("친구 요청 취소 성공"),
    BREAK_OFF_FRIEND_RELATIONSHIP_SUCCESSFULLY("친구 관계 끊기 성공"),
    UPDATE_USER_PROFILE_DATA_SUCCESSFULLY("유저 프로필 데이터 업데이트 성공"),
    SEARCH_USER_DATA_SUCCESSFULLY("유저 데이터 찾기 성공"),
    SEARCH_USER_EDIT_DATA_SUCCESSFULLY("유저 편집 데이터 찾기 성공"),
    SEARCH_PROFILE_DOGAM_LIST_SUCCESSFULLY("프로필 도감 리스트 생성 성공"),
    CANCEL_DOGAM_DISLIKE_SUCCESSFULLY("도감 싫어요 취소 성공"),
    ;

    private final String msg;

    MsgType(String msg) {
        this.msg = msg;
    }
}
