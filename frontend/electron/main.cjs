const {
  app,
  ipcMain,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
} = require("electron");
const path = require("path");
require("dotenv").config();

const isDev = process.env.IS_DEV == "true" ? true : false;

let win;
let tray;

function createWindow() {
  // 브라우저 창을 생성합니다.
  win = new BrowserWindow({
    width: 1700,
    height: 900,
    frame: false,
    // transparent: true,
    // alwaysOnTop: true,
    icon: path.join(__dirname, "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:5173"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );

  if (isDev) {
    win.webContents.openDevTools();
  }  
}

// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
app
  .whenReady()
  .then(createWindow)
  .then(() => {
    const iconPath = path.join(__dirname, "icon.png");
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

ipcMain.on("button-clicked", (event, message) => {
  console.log("Received message in main:", message);
});