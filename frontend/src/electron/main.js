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
    
    ws.subscribe('/lol-gameflow/v1/session', (data) => {
      if (data.phase === 'GameStart')
      {
        console.log('게임이 시작되었습니다!')
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
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        }
        function loopFunction() {
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
        return;
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