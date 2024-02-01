import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import electronLocalshortcut from "electron-localshortcut";
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
}

// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
app
  .whenReady()
  .then(createWindow)
  .then(() => {
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

ipcMain.on("minimize", (event) => {
  win.minimize();
});

ipcMain.on("maximize", (event) => {
  if (win.isMaximized()) {
    win.restore();
  } else {
    win.maximize();
  }
});

ipcMain.on("hidden", (event) => {
  win.hide();
});

//////////////////////////////////////////////////////////

ipcMain.on("button-clicked", (event, message) => {
  console.log("Received from button-clicked : ", message);
  win.webContents.send("receive-from-electron", message);
});

ipcMain.on("Riot Game Info", (event, message) => {
  console.log("Received from Riot Game Info : ", message);
});

ipcMain.on("lol", (event, message) => {
  console.log("actions : ", message);
});
