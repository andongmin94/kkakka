# 까까 Frontend

친구의 게임 라이브와 채팅·승패 예측·도감을 연결하는 React·Electron 클라이언트입니다. 브라우저, PWA, Electron이 같은 React 화면을 사용합니다.

## 요구 환경

- Node.js 22.12 이상
- npm
- Real Electron 모드에서 게임 이벤트를 확인하려면 실행 중인 League Client

## 설치

```bash
npm ci
```

## 브라우저 실행

별도 서버 없이 가상 사용자와 샘플 경기 데이터를 사용합니다.

```bash
npm run dev
```

`http://localhost:3000`에서 확인할 수 있습니다. `VITE_APP_MODE`를 지정하지 않으면 `mock` 모드로 실행됩니다.

실제 Spring Boot 서버와 연결할 때는 `.env.example`을 참고해 로컬 환경 파일을 만들고 다음 명령을 사용합니다.

```bash
npm run dev:real
```

주요 환경 변수:

| 변수 | 역할 |
| --- | --- |
| `VITE_APP_MODE` | `mock` 또는 `real` 실행 모드 |
| `VITE_API_BASE_URL` | Spring Boot API와 실시간 통신 주소 |
| `VITE_KAKAO_REST_API_KEY` | 로컬 개발용 Kakao REST API 키 |
| `VITE_KAKAO_REDIRECT_URI` | 로컬 개발용 OAuth 콜백 주소 |
| `VITE_GA_KEY` | 선택 사항인 분석 도구 식별자 |
| `KKAKKA_APP_MODE` | Electron 메인 프로세스의 `mock` 또는 `real` 게임 이벤트 모드 |
| `KKAKKA_DEV_SERVER_URL` | Electron 개발 창이 불러올 Vite 주소 |

실제 키와 운영 주소는 환경 파일에만 설정하고 저장소에는 추가하지 않습니다.

## Electron 실행

```bash
npm run electron:dev
```

Mock 모드에서는 League Client 없이 샘플 경기 이벤트와 라이브 흐름을 확인할 수 있습니다. Real 모드는 League Client의 게임 상태와 Live Client Data를 읽어 라이브 방으로 전달합니다.

Real Electron 모드에서는 렌더러의 `VITE_APP_MODE`와 메인 프로세스의 `KKAKKA_APP_MODE`를 모두 `real`로 설정합니다.

설치 가능한 데스크톱 앱을 만들려면 다음 명령을 사용합니다.

```bash
npm run app:build
```

## 주요 경로

| 경로 | 화면 |
| --- | --- |
| `/` | 로그인 |
| `/main` | 라이브 목록과 새 도감 |
| `/main/liveChat/:id` | 라이브 채팅과 승패 예측 |
| `/main/profile/:id` | 프로필, 도감, 칭호 |
| `/main/item` | 포인트와 아이템 |
| `/main/messagelist` | 1:1 메시지 목록 |
| `/main/message/:id` | 1:1 메시지 |
| `/main/dogam/:id` | 도감 상세와 댓글 |

## 상태와 API 경계

- TanStack React Query가 서버 상태와 캐시를 관리합니다.
- Zustand가 사용자·친구·알림·아이템 등 화면 상태를 공유합니다.
- Axios 요청 경계에서 `VITE_APP_MODE`에 따라 Mock과 Real 응답을 전환합니다.
- Mock 상태는 `kkakka:demo:v1` 키로 `localStorage`에 저장됩니다.
- Electron preload는 허용된 창 제어·런타임·게임 이벤트·알림 채널만 렌더러에 노출합니다.

## 검증

Mock API 계약과 상태 변경은 Vitest로 검증합니다.

```bash
npm test
npm run lint
npm run build:demo
npm run build:real
```

전체 제품 흐름, 샘플 데이터, 시스템 구조와 실행 경계는 [루트 README](../README.md)에서 확인할 수 있습니다.
