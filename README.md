

------------------------------------------

# 1. ![logo_dark](/frontend/public/image/logo.png) 소개

  
  ### **친구와의 우정을 다시, 게임으로 느끼는 끈끈한 유대감**
    
  🌊 Naming : 서비스의 슬로건인 "까도 내가 까"의 어감을 살려서 만든 표현.
  

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
    - Tanstack Query

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
  
![image](/uploads/a2cc07d1bd5b6378e7d8aab52b771108/image.png)

## 2-3 ERD
![D110_까까_ERD](/uploads/b1b3c273db18af3b04789738304da629/D110_까까_ERD.png)

## 2-4 API 명세서

  
------------------------------------------------------  

# 3. 🦈 주요 기능
------------------------------------------------------
  ![PT_8](./images/README/PT_8.png)
  ![PT_9](./images/README/PT_9.png)

  1. 회원 가입 시, 백준 연동 인증

  ![회원가입_연동](./images/README/회원가입_연동.gif)
  ![로그인](./images/README/로그인.gif)
    

  2. 문제 추천

    - 추천 문제 : user와 비슷한 실력을 가진 사용자 기반하여 추천

    - 사용자 기반 추천 문제 : user의 라이벌 기반 추천 문제, 라이벌이 푼 문제 중 user가 풀지 않은 문제 추천

    - 유형별 추천 문제 : 주요 알고리즘 유형별(총 8유형) 추천 문제

      - 주요 알고리즘 유형 : math, implementation, greedy, string, data structures, graphs,dp, bruteforce

  ![실력별_풀이유형별_추천](./images/README/실력별_풀이유형별_추천.gif)
  ![주요알고리즘_추천](./images/README/주요알고리즘_추천.gif)

  3. 라이벌 추천

    - 라이벌 추천 목록 : user와 비슷하거나 조금 상위에 있는 라이벌을 추천

      - 라이벌 등록 전, 추천 라이벌과 user의 실력 분석 기능

    - 라이벌 관리 : 라이벌 등록/해지
  
  ![라이벌추천_등록_해지](./images/README/라이벌추천_등록_해지.gif)
  ![라이벌추천_비교](./images/README/라이벌추천_비교.gif)


  4. 모의 코딩 테스트

    - 문제 : 추천 문제 리스트 중에서 추천

    - 코딩 테스트 시간 선정 기준 : 추천된 문제들의 level의 평균(문제 난이도)을 고려

    - 문제 제출 : BOJ에서 문제 제출 여부 확인

    - 테스트 종료 후, 제출한 문제들에 대한 실력 분석 제공

  ![모의테스트_시작](./images/README/모의테스트_시작.gif)
  ![모의테스트_제출확인](./images/README/모의테스트_제출확인.gif)
  ![모의테스트_결과](./images/README/모의테스트_결과.gif)
  

  5. 블로깅 자동화

    - 블로그 계정 설정 : Github 계정과 연결, 업로드할 Github repository 선택

    - Github 블로그 포스팅
  ![블로그계정설정](./images/README/블로그계정설정.gif)
  ![블로그_포스팅](./images/README/블로그_포스팅.gif)
  ![블로그_포스팅2](./images/README/블로그_포스팅2.gif)

  6. 실력 분석

    - 알고리즘 실력 분석

    - 티어 로드맵

    - 유사 사용자 분석

  ![알고리즘실력분석](./images/README/알고리즘실력분석.gif)
  ![티어로드맵](./images/README/티어로드맵.gif)
  ![유사사용자분석](./images/README/유사사용자분석.gif)


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
  
  ## 7-1. Tools

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

| 역할               | 이름   | 담당                                                                                                                                                  | 이메일               | 깃허브                              |
|--------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|-------------------------------------|
| 팀장, Backend Lead | 오세영 | - 유저 플로우 작성 <br> - 스프링 시큐리티 적용 <br> - JWT filter 적용 <br> - 공통 응답 API 작성 <br> - 공통 에러 응답 API 작성 <br> - 카카오 소셜 로그인 구현 <br> - 도감 관련 API 작성 <br> - 유저 데이터 관련 API 작성 <br> - 간단한 Front API 작성 <br> - Infra 구성 | osy9536@gmail.com   | [osy9536](https://github.com/osy9536) |
| 팀원, Backend      | 전수민 | - WebSocket 채팅 서버 담당 <br> - 롤 API 담당하여 명세서 작성 <br> - 롤 LOCAL API 이용한 크롤링                                                        | wjsaos2081@gmail.com| [dalcheonroadhead](https://github.com/dalcheonroadhead) |
| 팀원, Backend, PM  | 이수민 | - SSE 알림 담당 <br> - 칭호 생성 추가 삭제 로직 담당 <br> - 강제 칭찬 생성 삭제 로직 담당 <br> - 확성기 로직 담당                                       | oistmil@gmail.com   | [oistmil](https://github.com/oistmil) |
| 팀원, Frontend Lead| 김상훈 | - 일렉트론 변환 & PWA 변환 담당                                                                                                                      | k1016h@naver.com    | [andongmin94](https://github.com/andongmin94) |
| 팀원, Frontend, 서기| 김지연 | - Notion 관리 <br> - 회의록 작성 <br> - Figma 작성 <br> - 카카오 OAuth 로그인 클라이언트 <br> - API 연결                                               | jiyeon2536@naver.com| [jiyeon2536](https://github.com/jiyeon2536) |
| 팀원, Frontend, 총무| 이해건 | - (작성 예정)                                                                                                                                   | lhgeer2617@gmail.com| [lhgeer2617](https://github.com/lhgeer2617) |


--------------------------------------------
 
