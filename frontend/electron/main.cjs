const { app, ipcMain, BrowserWindow, Tray, Menu, nativeImage } = require("electron");
const path = require("path");
require("dotenv").config();

const isDev = process.env.IS_DEV == "true" ? true : false;

let win;
let tray;

function createWindow() {
  // 브라우저 창을 생성합니다.
  win = new BrowserWindow({
    width: 1600,
    height: 900,
    // frame: false,
    // transparent: true,
    // alwaysOnTop: true,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // index.html 파일 로드
  // win.loadFile("index.html");

  win.loadURL(
    isDev
      ? "http://localhost:5173"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );

  if (isDev) {
    win.webContents.openDevTools();
  }

  /////////////////////////////////////////////////////////////////////////////

  ipcMain.on("button-clicked", (event, message) => {
    console.log("Received message in main:", message);
  });

  ipcMain.on("close-clicked", (event) => {
    win.hide();
  });
}

// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
// Some APIs can only be used after this event occurs.
app
  .whenReady()
  .then(createWindow)
  .then(() => {
    const iconPath = path.join(__dirname, 'icon.png');
    const icon = nativeImage.createFromPath(iconPath)
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

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


