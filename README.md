------------------------------------------

# 1. ![logo_dark](/frontend/public/image/logo.png) 소개

  
  ### **친구와의 우정을 다시, 게임으로 느끼는 끈끈한 유대감**
    
  🌊 Naming : 서비스의 슬로건인 "까도 내가 까"의 어감을 살려서 만든 표현.
  - 기간: 24.01.08 ~ 24.02.16 (6주)
  - 인원: 6명(BE_3, FE_3)
  - 트랙: 웹디자인

  ### 주요 기능
  
**친구 놀리기 SNS 🤪**

- 롤 챗봇 라이브 중계
- 실시간 채팅
- 승패 예측 통한 포인트 적립
- 놀리기 아이템 구매와 사용
- 못한 도감 업로드

  
## 📃 문서
[💻 Notion](https://andongmin.notion.site/SSAFY-D110-c1510acfedea430c9db2aad48e882ba6?pvs=4)

## 🦿 성과
- 삼성청년SW아카데미 2학기 공통 프로젝트 우수상 (24.02.16)
<img src="/frontend/public/readme-image/award.png" width=430px />

------------------------------------------------------
  
# 2. 🔍 개발 환경
  
## 2-1. 환경 설정
    
  ### **👨‍💻 Front-end**
    
    - Visual Studio Code(IDE) `1.81.1`
    - HTML5, CSS3, Javascript(ES6)
    - React : `18.2.0`
    - Electron `28.1.4`
    - Stompjs `2.3.3`
    - Vite `5.0.8`
    - Typescript `5.2.2`
    - Tailwind CSS `3.4.1`
    - Zustand `4.4.7`
    - Tanstack React Query `5.17.15`
    - Nodejs `20`

  ### **👨‍💻 Back-end**
    
    - Intellij : `2023.3.2`
    - JVM OpenJDK : `17`
    - JWT : `0.11.5`
    - Spring Boot : `3.0.13`
      - JAVA Spring Data JPA
      - Spring Security
      - SSEEmitter
    - OAuth : `6.8.0`
    - Lettuce : `6.2.7`
    - spring-boot-WebSocket : `10.1.16`
    - Gradle
    - ORM : JPA
    
  ### **👩‍💻 CI/CD**  
    
    - AWS EC2
      - Nginx : `1.18.0`
      - Ubuntu : `20.04 LTS`
      - Docker : `25.0.2`
      - Jenkins :`2.443`
    - Docker Hub
      
  

## 2-2. 서비스 아키텍처
  
![image](/frontend/public/readme-image/아키텍처-image.png)

## 2-3 ERD
![D110_까까_ERD](/frontend/public/readme-image/ERD-image.png)

------------------------------------------------------  

# 3. 🦈 주요 기능
------------------------------------------------------
  ## 3-1. 일렉트론 Core 기능 1
![일렉트론_코어1](/frontend/public/readme-image/core-image1.gif)

  (앱에서의 채팅이 OS레이어를 통해 게임 레이어 상단으로 노출됩니다.)

  - [라이브중계방 - 게임플레이어] 채팅 내용이 게임 레이어 상단으로 전달됩니다.

  ## 3-2. 일렉트론 Core 기능 2
![일렉트론_코어2](/frontend/public/readme-image/core-image2.gif)
  
  (포탑이 안동민님을 처치했습니다.)

  (얘 죽었는데?)
  
  - [게임플레이어 - 라이브중계방] 인게임 이벤트가 봇 메시지로 채팅방에 중계됩니다.

  ## 3-3. 메인 페이지
![메인_페이지](/frontend/public/readme-image/main-image.gif)
  - 현재 게임중인 친구의 라이브 채팅방 입장
  - 친구들의 새로 올라온 도감 확인
  - 프로필 페이지, 아이템샵, 메세지함, 알림 확인
  - 앱 다운로드 및 서비스 약관 확인
  - 친구 찾기

  ## 3-4. 라이브 방 입장  
![라이브_채팅방](/frontend/public/readme-image/live-image.gif)
  - 일반 채팅
  - 사진 채팅
  - 친구 도감 채팅
  - 채팅시 친구한테 window 알림 기능

  ## 3-5. 프로필 페이지
![프로필_페이지](/frontend/public/readme-image/profile-image.gif)
  - 프로필 주인 도감 확인
  - 프로필 주인 명예의 전당(칭호) 확인
  - 프로필 편집

  ## 3-6. 알림
![알림](/frontend/public/readme-image/noti-image.gif)
  - 새 도감 알림시 도감으로 이동
  - 새 칭호 알림시 프로필로 이동
  - 새 댓글 알림시 도감으로 이동
  - 친구 요청시 친구 프로필로 이동

  ## 3-7. 친구 목록
![친구_목록](/frontend/public/readme-image/friend-image.gif)
  - 친구들의 프로필 확인

  ## 3-8. 친구 검색
![친구_검색](/frontend/public/readme-image/search-image.gif)
  - 친구 카카오 이메일로 검색

  ## 3-9. 아이템 샵
![아이템_샵](/frontend/public/readme-image/shop-image.gif)
  - 칭호 지정권 사용
  - 강제 칭찬권 사용
  - 확성기 사용

  ## 3-10. 메세지함
![메세지함](/frontend/public/readme-image/message-image.gif)
  - 1:1 채팅

  ## 3-11. 배팅
![배팅하기](/frontend/public/readme-image/betting-image.gif)
  - 이긴다, 진다로 배팅 가능
  - 승패에 따라 정산
  
  ## 3-12. 댓글 달기, 싫어요
![배팅하기](/frontend/public/readme-image/reaction-image.gif)
  - 친구의 웃긴 도감을 싫어요
  - 친구의 도감에 댓글 달기

--------------------------

# 4. 🛡 배포
------------------------------------------------------
  - https
    - certbot과 Nginx를 통한 SSL 인증
    - EC2 제공 도메인 'http://i10D110.p.ssafy.io/' 사용하여 인증
  - 자동 배포
    - Gitlab에서 web hook 설정을 통해 jenkins 빌드 유발
    - jenkins의 shell script 실행 기능을 이용하여 git pull -> docker build -> run
    - Nginx로 reverse proxy 설정
  
  
--------------------------


# 5. 🖊 Cooperation
------------------------------------------------------
  
  ## Tools

    - Git

    - Jira

    - Notion

    - Mattermost

    - Discord

    - Gerrit

    - Jenkins
          
--------------------------

# 6. Ground rule
--------------------------------------------

  ## 6-1 Commit Convention
  ```
  # Feat : #이슈번호 기능

##### 제목은 최대 50 글자까지만 입력 ############## -> |


# 본문은 위에 작성
######## 본문은 한 줄에 최대 72 글자까지만 입력 ########################### -> |
- 본문 내용

# issue close는 본문 최하단에 공백 하나 아래에 작성

# --- COMMIT END ---
# <타입> 리스트
#   Feat    : 기능 (새로운 기능)
#   Fix     : 버그 (버그 수정)
#   Refactor: 리팩토링
#   Test    : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)
#   Chore   : 기타 변경사항 (빌드 스크립트 수정 등 자잘한 수정들)
#   Style   : 세미콜론 추가, 변수명 변경, 주석 추가/제거
#   Docs    : 파일, 문서(이미지 등) 추가, 삭제
#   Build   : 빌드 관련 파일 수정
#   CI      : CI 관련 설정 수정
# ------------------
#     모든 내용은 항상 한글로 작성 (타입은 위의 영어로)
#     제목은 명령문으로
#     제목 끝에 마침표(.) 금지
#     제목과 본문을 한 줄 띄워 분리하기
#     본문은 "어떻게" 보다 "무엇을", "왜"를 설명한다.
#     본문에 여러줄의 메시지를 작성할 땐 "-"로 구분
# ------------------

ex1) Feat : S10P12D110-17 로그인 구현

		내용 ...

	  S10P12D110-53 #done #comment 닫기

ex2) Feat/로그인 : 패스워드 암호화

		내용 ...
		
		S10P12D110-53 #done #comment 닫기
  ```

  ## 6-2 PR Template
  ```
  ## 📕 제목

## 📗 작업 내용

### PR 타입
- [ ] 기능 추가
- [ ] 기능 삭제
- [ ] 버그 수정
- [x] 코드 리팩토링

### 반영 브랜치
feat/S10P12D110-17-signup -> develop

### 변경 사항
- 기존 username만 따로 가져가던 형태에서 관계를 매핑하여 User 객체를 통째로 참조하도록 변경
- 게시글, 댓글 모두 수정/삭제 시 username과 일치하는게 아닌 userId와 일치하는 값을 조회

### 테스트 결과
[] Postman 테스트 결과 이상 없습니다.
[] local ci 테스트 결과 이상 없습니다.
```
--------------------------------------------

# 7. 👨‍👩‍👧‍👦 팀원 소개
------------------------------------------------------
# 팀원 역할 및 담당

| 오세영 | 전수민 | 이수민 | 김상훈 | 김지연 | 이해건 |
| ----- | ------ | ----- | ------ | ----- | ------ |
| <a href="https://github.com/osy9536"><img src="https://avatars.githubusercontent.com/u/76714304?v=4" alt="osy9536" width="100" height="100"></a> | <a href="https://github.com/dalcheonroadhead"><img src="https://avatars.githubusercontent.com/u/102154788?v=4" alt="dalcheonroadhead" width="100" height="100"></a> | <a href="https://github.com/oistmil"><img src="https://avatars.githubusercontent.com/u/75559067?v=4" alt="oistmil" width="100" height="100"></a> | <a href="https://github.com/andongmin94"><img src="https://avatars.githubusercontent.com/u/110483588?v=4" alt="andongmin94" width="100" height="100"></a> | <a href="https://github.com/jiyeon2536"><img src="https://avatars.githubusercontent.com/u/125720796?v=4" alt="jiyeon2536" width="100" height="100"></a> |<a href="https://github.com/lhgeer2617"><img src="https://avatars.githubusercontent.com/u/139435456?v=4" alt="lhgeer2617" width="100" height="100"></a> | 

| Contributors | Role | Position |
| ------------ | ---- | -------- |
| 　오세영 | 팀장, <br /> Backend Lead | - 유저 플로우 작성 <br> - 스프링 시큐리티 적용 <br> - JWT filter 적용 <br> - 공통 응답 API 작성 <br> - 공통 에러 응답 API 작성 <br> - 카카오 소셜 로그인 구현 <br> - 도감 관련 API 작성 <br> - 유저 데이터 관련 API 작성 <br> - 간단한 Front API 작성 <br> - Infra 구성 ( AWS RDS, EC2, Nginx Reverse Proxy, Jenkins Pipeline, Dockerfile) |
| 　전수민 | 팀원, <br /> Backend | - WebSocket 채팅 서버 <br> - 롤 API 담당하여 명세서 작성 <br> - 롤 LOCAL API 이용한 크롤링 <br> - socket s3를 이용한 이미지 업로드 |
| 　이수민 | 팀원, <br /> Backend, <br /> PM  | - SSE 이용한 실시간 알림, 확성기 기능 구현(Backend SseEmitter 적용, Frontend EventSourcePolyfill 적용) <br> - 아이템샵 구입(칭호, 강제칭찬권, 확성기) 관련 API 작성 <br> - 칭호 관련 API 작성 <br> - 친구 관련 API 작성 <br> - JUnit 서비스단 단위 테스트 작성 |
| 　김상훈 | 팀원, <br /> Frontend Lead| - 일렉트론 포팅 및 개발 & PWA 포팅 <br> - 클라이언트 & 라이브 채팅창 연동 <br> - 선행기술 연구 <br> - UCC 제작 |
| 　김지연 | 팀원, <br /> Frontend, <br /> 서기| - Notion 을 통해 협업 문서 관리 및 회의록 작성<br> - Figma 활용하여 디자인 및 와이어프레임 작성<br> - react-ga4 활용하여 google analytics 적용 <br> - 카카오 로그인 API 활용하여 회원가입 및 로그인 구현<br> - 도감, 댓글 CRUD 개발<br> - React-Query 사용하여 무한 스크롤 구현 <br> - UI, UX 개선  |
| 　이해건 | 팀원, <br /> Frontend, <br /> 총무| - WebSocket 채팅 프론트 <br> - 웹 UI/UX <br> - PWA 반응형 모바일 UI |
