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
    CREATE_DOGAM_LIST_SUCCESSFULLY("메인 도감 리스트 생성 성공"),
    DELETE_DOGAM_COMMENT_SUCCESSFULLY("도감 댓글 삭제 성공"),
    CREATE_DOGAM_COMMENT_SUCCESSFULLY("도감 댓글 생성 성공"),
    CREATE_DOGAM_DISLIKE_SUCCESSFULLY("도감 싫어요 생성 성공"),
    SEARCH_DOGAM_DETAIL_SUCCESSFULLY("도감 디테일 조회 성공"),
    SEARCH_POINT_SUCCESSFULLY("포인트 조회 성공"),
    ;

    private final String msg;

    MsgType(String msg) {
        this.msg = msg;
    }
}
