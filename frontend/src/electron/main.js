import axios from "axios";
import https from "https";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import electronLocalshortcut from "electron-localshortcut";
import { createWebSocketConnection } from "league-connect";
import { app, ipcMain, BrowserWindow, Tray, Menu, nativeImage, Notification } from "electron";

import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

dotenv.config();
const isDev = process.env.IS_DEV === "true";
const BASE_URL = process.env.API_BASE_URL;

let win;
let tray;

function createWindow() {
  // 브라우저 창을 생성합니다.
  win = new BrowserWindow({
    width: 1700,
    height: 900,
    frame: false,

    icon: join(dirname(fileURLToPath(import.meta.url)), "icon.png"),
    webPreferences: {preload: join(dirname(fileURLToPath(import.meta.url)), "preload.js")},
  });

  win.loadURL(isDev ? "http://localhost:3000" : "https://kkakka.vercel.app");

  electronLocalshortcut.register(win, "F12", () => {console.log("F12 is pressed"); win.webContents.toggleDevTools()});

  ipcMain.on("minimize", (event) => {win.minimize()});

  ipcMain.on("maximize", (event) => {if (win.isMaximized()) { win.setBounds({ width: 800, height: 600 }); console.log("restoring")} else {win.maximize(); console.log("maximizing")}});

  ipcMain.on("hidden", (event) => {win.hide()});

  app.on("window-all-closed", () => {if (process.platform !== "darwin") {app.quit()}});

  app.on("activate", () => {if (BrowserWindow.getAllWindows().length === 0) {createWindow()}});
}

function startNotification (title = "까까 앱 가동", body = "copyright 2024 김상훈") {
  let notification = { title, body, icon:join(dirname(fileURLToPath(import.meta.url)), "icon.png") }
  new Notification(notification).show()
}

function showNotification (title = "까까 앱 가동", body = "copyright 2024 김상훈", icon) {
  let notification = { title, body, icon }
  new Notification(notification).show()
}

// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
app.whenReady().then(createWindow).then(async () => {
    const iconPath = join(dirname(fileURLToPath(import.meta.url)), "icon.png");
    const icon = nativeImage.createFromPath(iconPath);
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
      { label: "켜기", type: "normal", click: () => win.show() },
      { label: "끄기", type: "normal", click: () => app.quit() },
    ]);

    tray.setToolTip("까까");
    tray.setContextMenu(contextMenu);
    tray.on("double-click", () => {win.show()});
    //////////////////// 리그오브레전드 통신 /////////////////////

    // 방 만드는데 쓰는 함수 현재 로그인 접속자의 메일을 쓰게 해야함.
    async function startBroadcast (userId) {
      const url = `${BASE_URL}/api/friends/broadcasts/enter/${userId}`;
    
      try {
        const response = await axios.post(url, {}, { // 두 번째 인자를 빈 객체로 설정
          headers: {Authorization: token},
        });
        console.log("서버 응답:", response.data);
        roomId = response.data.data;
      } catch (error) {
        console.error("Error starting a new broadcast", error.message);
      }
    }

    // 클라이언트랑 웹소켓으로 연결하는 부분
    const ws = await createWebSocketConnection({authenticationOptions: {awaitConnection: true}});
    let gameIsRunning = false;
    
    // 딱 게임이 시작되는 순간부터 게임이 끝날 때까지의 이벤트를 받아오는 부분
    ws.subscribe('/lol-gameflow/v1/session', (data) => {
      if (data.phase === 'GameStart')
      {
        console.log('게임이 시작되었습니다!')
        gameIsRunning = true;
        let oneShotChecker = false;
        let lastSentEventId = -1;
        startBroadcast(userId).then(() => {
          console.log("방 번호 : " + roomId);
          connect();
        })

        // connect();
        // 마지막으로 전송한 이벤트의 ID를 저장하는 변수
        function sendNewEvents(events) {
          let newEvents = events.Events.filter(event => event.EventID > lastSentEventId);
          
          // lastSentEventId 이후의 모든 이벤트를 찾습니다.
          if (newEvents.length != 0){
            newEvents.forEach(event => {
            // console.log(event);
            if (event.EventName === "MinionsSpawning") { sendNewEvents("미니언이 생성되었습니다."); console.log("미니언이 생성되었습니다.") }

            if (event.EventName === "ChampionKill") { sendNewEvents(event.KillerName + "님이 " + event.VictimName + "님을 처치했습니다!"); console.log(event.KillerName + "님이 " + event.VictimName + "님을 처치했습니다!")}
            else if (event.EventName === "Multikill") { if (event.KillStreak === 2) { sendNewEvents(event.KillerName + "님이 " + "더블킬!"); console.log(event.KillerName + "님이 " + "더블킬!") } else if (event.KillStreak === 3) { sendNewEvents(event.KillerName + "님이 " + "트리플킬!"); console.log(event.KillerName + "님이 " + "트리플킬!") } else if (event.KillStreak === 4) { sendNewEvents(event.KillerName + "님이 " + "쿼드라킬!"); console.log(event.KillerName + "님이 " + "쿼드라킬!") } else if (event.KillStreak === 5) { sendNewEvents(event.KillerName + "님이 " + "펜타킬!"); console.log(event.KillerName + "님이 " + "펜타킬!") }}
            else if (nevent.EventName === "TurretKilled") { sendNewEvents(event.KillerName + "님이 " + "포탑을 파괴했습니다."); console.log(event.KillerName + "님이 " + "포탑을 파괴했습니다.") }

            if (event.EventName === "HordeKill") { sendNewEvents(event.KillerName + "님이 " + "공허 유충을 처치했습니다!"); console.log(event.KillerName + "님이 " + "공허 유충을 처치했습니다!") }
            else if (event.EventName === "HeraldKill") { sendNewEvents(event.KillerName + "님이 " + "협곡의 전령을 처치했습니다!"); console.log(event.KillerName + "님이 " + "협곡의 전령을 처치했습니다!")}
            else if (event.EventName === "BaronKill") { sendNewEvents(event.KillerName + "님이 " + "바론 남작을 처치했습니다!"); console.log(event.KillerName + "님이 " + "바론 남작을 처치했습니다!")}
            else if (event.EventName === "DragonKill") { sendNewEvents(event.KillerName + "님이 " + "용을 처치했습니다!"); console.log(event.KillerName + "님이 " + "용을 처치했습니다!")}
          })}
          // newEvents를 전송하는 코드를 여기에 작성합니다.
          if (newEvents.length > 0) { lastSentEventId = newEvents[newEvents.length - 1].EventID }
          // 마지막으로 전송한 이벤트의 ID를 업데이트합니다.
        }
        async function fetchEventData() {
          try {
            const response = await axios({
              method: "get",
              url: "https://127.0.0.1:2999/liveclientdata/allgamedata",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              httpsAgent: new https.Agent({
                rejectUnauthorized: false,
              }),
            });

            const allGameData = response.data;
            const activePlayer = allGameData.activePlayer;
            const playerName = activePlayer.summonerName;
            const events = allGameData.events;
            // variable areas

            let players_info = allGameData.allPlayers.map((players, index) => {
              let player = {};
              player.team = index < 5 ? "블루" : "레드";
              player.summonerName = players.summonerName;
              player.championName = players.championName;
              player.summonerSpells1 = players.summonerSpells.summonerSpellOne.displayName;
              player.summonerSpells2 = players.summonerSpells.summonerSpellTwo.displayName;
              return player;
            });
            let players = allGameData.allPlayers.map((players) => {
              let player = {};
              player.level = players.level;
              player.kills = players.scores.kills;
              player.deaths = players.scores.deaths;
              player.assists = players.scores.assists;
              player.cs = players.scores.creepScore;
              player.wards = players.scores.wardScore;
              player.items = players.items.filter(item => item !== undefined).map(item => item.displayName).join(", ");
              return player;
            });
            // playerinfo areas
            
            if (!oneShotChecker) {
              oneShotChecker = true;
              players_info.forEach(player => {
                sendMessageToSocket(player.team + "팀 | 플레이어 : " + player.summonerName);
                sendMessageToSocket("챔프 : " + player.championName + " | 스펠 : " + player.summonerSpells1 + " , " + player.summonerSpells2);
                sendMessageToSocket(playerName + "이 과연 이길 수 있을까?");
              });
            }
            
            sendNewEvents(events);

            // will be axios post areas
          } catch (error) {};
        }
        function loopFunction() {
          if (!gameIsRunning) return;
          fetchEventData();
          
          // 1초 후에 loopFunction을 다시 호출합니다.
          setTimeout(loopFunction, 1000);
        }
        // 함수를 최초로 호출하여 루프를 시작합니다.
        loopFunction();
      }
      if (data.phase === 'WaitingForStats')
      { 
        console.log('게임이 종료되었습니다!')
        gameIsRunning = false;
      }
    });
    ////////////////////////////////////////////////////////////
  });

////////////////////// 리액트 통신 //////////////////////////
ipcMain.on("button-clicked", (event, message) => {
  console.log("메인 프로세스에서 받은 메시지 : ", message);
  win.webContents.send("channel-name", message);
});

ipcMain.on("Riot Game Info", (event, message) => {
  console.log("Received from Riot Game Info : ", message);
});

let token;
ipcMain.on("token", (event, message) => {
  token = message;
  console.log("token : ", token);
  clientHeader = {Authorization: token};
})

let userInfo;
let userId;
let loginCheck = false;
ipcMain.on("userInfo", (event, message) => {
  userInfo = message;
  userId = userInfo.userId;
  TESTUSER = userId;
  console.log("사용자 정보 : ", userInfo);
  if (!loginCheck) {
    loginCheck = true;
    startNotification(userInfo.userAlias, userInfo.userName + "님 입장하십니다");
  }
})

////////////////////////////////////////////////////////////

////////////////////// 웹소켓 통신 //////////////////////////

let stompClient;
let TESTUSER;
let roomId;
let clientHeader;

const connect =  (event) => {
  var sockJS = new SockJS("http://localhost:8080/ws-stomp");
  stompClient = Stomp.over(sockJS);
  stompClient.connect(clientHeader,onConnected, onError);
}

// 첫 연결 및 환영 메세지 보내기 
function onConnected() {
    console.log("채팅 앱 첫 연결 실행!")
    stompClient.subscribe("/sub/chat/room/"+ roomId,onMessageReceivedFromSocket ,{userId: userId, chatRoomType: "MANY" } )
    stompClient.send("/pub/chat/enterUser",clientHeader,JSON.stringify({meesageType: "ENTER", content: userInfo.userName + "님 환영합니다!", userId: userId, chatRoomId: roomId }))
}

function onError (error) {console.log(error)}

// 메세지 보내는 로직 
function sendMessageToSocket(message) {

    var chatMessage = {
      "chatRoomId": roomId,
      "userId": TESTUSER,
      "content": message,
      "messageType": "CHAT_BOT"
    }
    stompClient.send("/pub/chat/sendMessage", {},JSON.stringify(chatMessage));
}

// 메세지 받는 로직 -> subscribe의 두번째 로직으로 넣으면 해당 주소로 들어오는 메세지를 다 받는다. 
function onMessageReceivedFromSocket (payload){
  
  var chat = JSON.parse(payload.body);
  console.log("들어온 payload:" + payload);
  console.log("들어온 메세지:" + chat.content);
  showNotification(chat.userName, chat.content, chat.imgCode);

  const messageDTO = {
    isUser: chat.userId === TESTUSER? true : false,
    text: chat.content,
    isTyping: chat.userId === TESTUSER? false : true,
    id: Date.now()
  }

  /*
        // 내가 쓴 메세지
    { text: chat.content, isUser: true },

    // ChatBot이 쓴 메세지 
    {
      text: `당신의 메세지는: "${chat.content}"`,
      isUser: false,
      // 타이핑 애니메이션을 내는 트리거 
      isTyping: true,
      id: Date.now()
    }
  */  
}

////////////////////////////////////////////////////////////

// const championMapping = {
//   "Aatrox": "아트록스",
//   "Ahri": "아리",
//   "Akali": "아칼리",
//   "Alistar": "알리스타",
//   "Amumu": "아무무",
//   "Anivia": "애니비아",
//   "Annie": "애니",
//   "Aphelios": "아펠리오스",
//   "Ashe": "애쉬",
//   "Aurelion Sol": "아우렐리온 솔",
//   "Azir": "아지르",
//   "Bard": "바드",
//   "Blitzcrank": "블리츠크랭크",
//   "Brand": "브랜드",
//   "Braum": "브라움",
//   "Briar": "브라이어",
//   "Caitlyn": "케이틀린",
//   "Camille": "카밀",
//   "Cassiopeia": "카시오페아",
//   "ChoGath": "초가스",
//   "Corki": "코르키",
//   "Darius": "다리우스",
//   "Diana": "다이애나",
//   "Dr. Mundo": "문도 박사",
//   "Draven": "드레이븐",
//   "Ekko": "에코",
//   "Elise": "엘리스",
//   "Evelynn": "이블린",
//   "Ezreal": "이즈리얼",
//   "Fiddlesticks": "피들스틱",
//   "Fiora": "피오라",
//   "Fizz": "피즈",
//   "Galio": "갈리오",
//   "Gangplank": "갱플랭크",
//   "Garen": "가렌",
//   "Gnar": "나르",
//   "Gragas": "그라가스",
//   "Graves": "그레이브즈",
//   "Hecarim": "헤카림",
//   "Heimerdinger": "하이머딩거",
//   "Illaoi": "일라오이",
//   "Irelia": "이렐리아",
//   "Ivern": "아이번",
//   "Janna": "잔나",
//   "Jarvan IV": "자르반 4세",
//   "Jax": "잭스",
//   "Jayce": "제이스",
//   "Jhin": "진",
//   "Jinx": "징크스",
//   "KaiSa": "카이사",
//   "Kalista": "칼리스타",
//   "Karma": "카르마",
//   "Karthus": "카서스",
//   "Kassadin": "카사딘",
//   "Katarina": "카타리나",
//   "Kayle": "케일",
//   "Kayn": "케인",
//   "Kennen": "케넨",
//   "KhaZix": "카직스",
//   "Kindred": "킨드레드",
//   "Kled": "클레드",
//   "Kog'Maw": "코그모",
//   "LeBlanc": "르블랑",
//   "Lee Sin": "리 신",
//   "Leona": "레오나",
//   "Lillia": "릴리아",
//   "Lissandra": "리산드라",
//   "Lucian": "루시안",
//   "Lulu": "룰루",
//   "Lux": "럭스",
//   "Malphite": "말파이트",
//   "Malzahar": "말자하",
//   "Maokai": "마오카이",
//   "Master Yi": "마스터 이",
//   "Miss Fortune": "미스 포츈",
//   "Mordekaiser": "모데카이저",
//   "Morgana": "모르가나",
//   "Nami": "나미",
//   "Nasus": "나서스",
//   "Nautilus": "노틸러스",
//   "Neeko": "니코",
//   "Nidalee": "니달리",
//   "Nocturne": "녹턴",
//   "Nunu & Willump": "누누와 윌럼프",
//   "Olaf": "올라프",
//   "Orianna": "오리아나",
//   "Ornn": "오른",
//   "Pantheon": "판테온",
//   "Poppy": "뽀삐",
//   "Pyke": "파이크",
//   "Qiyana": "키아나",
//   "Quinn": "퀸",
//   "Rakan": "라칸",
//   "Rammus": "람머스",
//   "RekSai": "렉사이",
//   "Rell": "렐",
//   "Renekton": "레넥톤",
//   "Rengar": "렝가",
//   "Riven": "리븐",
//   "Rumble": "럼블",
//   "Ryze": "라이즈",
//   "Samira": "사미라",
//   "Sejuani": "세주아니",
//   "Senna": "세나",
//   "Seraphine": "세라핀",
//   "Sett": "세트",
//   "Shaco": "샤코",
//   "Shen": "쉔",
//   "Shyvana": "쉬바나",
//   "Singed": "신지드",
//   "Sion": "사이온",
//   "Sivir": "시비르",
//   "Skarner": "스카너",
//   "Smolder": "스몰더",
//   "Sona": "소나",
//   "Soraka": "소라카",
//   "Swain": "스웨인",
//   "Sylas": "사일러스",
//   "Syndra": "신드라",
//   "Tahm Kench": "탐 켄치",
//   "Taliyah": "탈리야",
//   "Talon": "탈론",
//   "Taric": "타릭",
//   "Teemo": "티모",
//   "Thresh": "쓰레쉬",
//   "Tristana": "트리스타나",
//   "Trundle": "트런들",
//   "Tryndamere": "트린다미어",
//   "Twisted Fate": "트위스티드 페이트",
//   "Twitch": "트위치",
//   "Udyr": "우디르",
//   "Urgot": "우르곳",
//   "Varus": "바루스",
//   "Vayne": "베인",
//   "Veigar": "베이가",
//   "VelKoz": "벨코즈",
//   "Vi": "바이",
//   "Viego": "비에고",
//   "Viktor": "빅토르",
//   "Vladimir": "블라디미르",
//   "Volibear": "볼리베어",
//   "Warwick": "워윅",
//   "Xayah": "자야",
//   "Xerath": "제라스",
//   "Xin Zhao": "신 짜오",
//   "Yasuo": "야스오",
//   "Yone": "요네",
//   "Yorick": "요릭",
//   "Yuumi": "유미",
//   "Zac": "자크",
//   "Zed": "제드",
//   "Zeri": "제리",
//   "Ziggs": "직스",
//   "Zilean": "질리언",
//   "Zoe": "조이",
//   "Zyra": "자이라",
// };

// if (getChampionNameInKorean(players.rawChampionName.split("game_character_displayname_")[1]) === undefined) {
//   player.championName = players.rawChampionName.split("game_character_displayname_")[1];
// } else { player.championName = getChampionNameInKorean(players.rawChampionName.split("game_character_displayname_")[1])}

// function getChampionNameInKorean(englishName) {
//   return championMapping[englishName];
// }

