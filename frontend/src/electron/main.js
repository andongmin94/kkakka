import axios from "axios";
import https from "https";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import electronLocalshortcut from "electron-localshortcut";
import { createWebSocketConnection } from "league-connect";
import { OverlayController } from 'electron-overlay-window';
import { app, ipcMain, BrowserWindow, Tray, Menu, nativeImage } from "electron";

import * as StompJs from '@stomp/stompjs';
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
    transparent: true,
    // alwaysOnTop: true,
    icon: join(dirname(fileURLToPath(import.meta.url)), "icon.png"),
    webPreferences: {
      preload: join(dirname(fileURLToPath(import.meta.url)), "preload.js"),
    },
  });

  win.loadURL(isDev ? "http://localhost:3000" : "https://kkakka.vercel.app");

  electronLocalshortcut.register(win, "F12", () => {
    console.log("F12 is pressed");
    win.webContents.toggleDevTools();
  });

  ipcMain.on("minimize", (event) => {
    win.minimize();
  });

  ipcMain.on("maximize", (event) => {
    if (win.isMaximized()) {
      win.setBounds({ width: 800, height: 600 });
      console.log("restoring");
    } else {
      win.maximize();
      console.log("maximizing");
    }
  });

  ipcMain.on("hidden", (event) => {
    win.hide();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}

// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
app
  .whenReady()
  .then(createWindow)
  .then(async () => {
    const iconPath = join(dirname(fileURLToPath(import.meta.url)), "icon.png");
    const icon = nativeImage.createFromPath(iconPath);
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
      { label: "켜기", type: "normal", click: () => win.show() },
      { label: "끄기", type: "normal", click: () => app.quit() },
    ]);

    tray.setToolTip("까까");
    tray.setContextMenu(contextMenu);
    tray.on("double-click", () => {
      win.show();
    });

    //////////////////// 리그오브레전드 통신 /////////////////////

    // 방 만드는데 쓰는 함수 현재 로그인 접속자의 메일을 쓰게 해야함.
    async function startBroadcast (userId) {
      const url = `${BASE_URL}/api/friends/broadcasts/enter/${userId}`;
    
      try {
        const response = await axios.post(url, {}, { // 두 번째 인자를 빈 객체로 설정
          headers: {
            Authorization: token,
          },
        });
        console.log("서버 응답:", response.data);
        return response.data.data;
      } catch (error) {
        console.error("Error starting a new broadcast", error.message);
      }
    }

    // 클라이언트랑 웹소켓으로 연결하는 부분
    const ws = await createWebSocketConnection({
      authenticationOptions: {
        awaitConnection: true,
      },
    });
    let gameIsRunning = false;
    
    // 딱 게임이 시작되는 순간부터 게임이 끝날 때까지의 이벤트를 받아오는 부분
    ws.subscribe('/lol-gameflow/v1/session', (data) => {
      if (data.phase === 'GameStart')
      {
        console.log('게임이 시작되었습니다!')
        gameIsRunning = true;
        let oneShotChecker = false;
        let lastSentEventId = -1;
        connect();
        // 마지막으로 전송한 이벤트의 ID를 저장하는 변수
        function sendNewEvents(events) {
          let newEvents = events.Events.filter(event => event.EventID > lastSentEventId);
          
          // lastSentEventId 이후의 모든 이벤트를 찾습니다.
          if (newEvents.length != 0){
            console.log(newEvents[0]);
          }
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
              player.championName = players.rawChampionName.split("game_character_displayname_")[1];
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
              // OverlayController.attachByTitle(win, 'League of Legends (TM) Client');
              // OverlayController.focusTarget();
              // win.setSize(300, 200);
              // win.setPosition(0, 880);
              // win.setAlwaysOnTop(true);
              startBroadcast(userId)
              console.log(playerName); // 이 코드는 현재 플레이어의 정보를 콘솔에 출력합니다.
              console.log(players_info); // 이 코드는 모든 플레이어의 정보를 콘솔에 출력합니다.
              oneShotChecker = true;
            }
            
            // console.log(players); // 이 코드는 각 플레이어의 정보를 콘솔에 출력합니다.
            sendNewEvents(events);
            // sendMessageToSocket(players);
            sendMessageToSocket("테스트 메세지");
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
  console.log("Received from token : ", token);
  clientHeader = {Authorization: token};
})

let userInfo;
let userId;
ipcMain.on("userInfo", (event, message) => {
  userInfo = message;
  userId = userInfo.userId;
  TESTUSER = userId;
  roomId = userId;
  console.log("Received from userInfo : ", userInfo);
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
    stompClient.send("/pub/chat/enterUser",clientHeader,JSON.stringify({meesageType: "ENTER", content: userInfo.userName + "님 환영합니다!", userId: userId, chatRoomId: userId }))
}

function onError (error) {
  console.log(error);
}

// 메세지 보내는 로직 
function sendMessageToSocket(message) {

    var chatMessage = {
      "chatRoomId": roomId,
      "userId": TESTUSER,
      "content": message,
      "messageType": "MANY"
    }
    stompClient.send("/pub/chat/sendMessage", {},JSON.stringify(chatMessage));
}

// 메세지 받는 로직 -> subscribe의 두번째 로직으로 넣으면 해당 주소로 들어오는 메세지를 다 받는다. 
function onMessageReceivedFromSocket (payload){
  
  var chat = JSON.parse(payload.body);
  console.log("들어온 메세지:" + chat.content);

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