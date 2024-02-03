import axios from "axios";
import https from "https";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import electronLocalshortcut from "electron-localshortcut";
import { createWebSocketConnection } from "league-connect";
import { app, ipcMain, BrowserWindow, Tray, Menu, nativeImage } from "electron";

dotenv.config();

const isDev = process.env.IS_DEV === "true";
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
    const ws = await createWebSocketConnection({
      authenticationOptions: {
        awaitConnection: true,
      },
    });
    let gameIsRunning = false;
    
    ws.subscribe('/lol-gameflow/v1/session', (data) => {
      if (data.phase === 'GameStart')
      {
        console.log('게임이 시작되었습니다!')
        gameIsRunning = true;
        let oneShotChecker = false;
        let lastSentEventId = 0;
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
              oneShotChecker = true;
              console.log(playerName); // 이 코드는 현재 플레이어의 정보를 콘솔에 출력합니다.
              console.log(players_info); // 이 코드는 모든 플레이어의 정보를 콘솔에 출력합니다.
            }
            
            // console.log(players); // 이 코드는 각 플레이어의 정보를 콘솔에 출력합니다.
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
////////////////////////////////////////////////////////////