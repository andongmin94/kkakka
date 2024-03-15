import { configureTransport } from "@/api/configureTransport";

/**
 * 렌더러 모듈을 불러오기 전에 실행 모드에 맞는 HTTP 전송 계층을 구성한다.
 *
 * Mock adapter가 `axiosInstance` 생성보다 먼저 전역 기본값에 등록되어야 하므로
 * 이 파일이 브라우저와 Electron 렌더러의 공통 진입점 역할을 한다.
 */
configureTransport();

void import("./main");
