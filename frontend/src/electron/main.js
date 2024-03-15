import axios from "axios";
import { app, BrowserWindow, ipcMain, Menu, nativeImage, Notification, shell, Tray } from "electron";
import https from "https";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const iconPath = join(currentDir, "icon.png");
const appMode = process.env.KKAKKA_APP_MODE === "real" ? "real" : "mock";
const developmentUrl = process.env.KKAKKA_DEV_SERVER_URL || "http://localhost:3000";

const sampleEvents = [
  { eventName: "GameStart" },
  { eventName: "MinionsSpawning" },
  { eventName: "ChampionKill", killerName: "파도", victimName: "모래" },
  { eventName: "TurretKilled", killerName: "파도" },
  { eventName: "DragonKill", killerName: "파도" },
  { eventName: "GameEnd", result: "Win" },
];

let mainWindow;
let tray;
let eventTimers = [];
let leagueConnection;
let leagueSubscription;
let leaguePollTimer;
let lastLeagueEventId = -1;

/** League 원시 이벤트를 renderer가 바로 표시할 수 있는 한국어 메시지로 정규화한다. */
function mapGameEvent(event) {
  switch (event.eventName) {
    case "GameStart":
      return "샘플 경기가 시작됐습니다.";
    case "MinionsSpawning":
      return "미니언이 생성됐습니다.";
    case "ChampionKill":
      return `${event.killerName}님이 ${event.victimName}님을 처치했습니다.`;
    case "Multikill":
      return `${event.killerName}님이 ${event.killStreak}연속 처치를 기록했습니다.`;
    case "TurretKilled":
      return `${event.killerName}님이 포탑을 파괴했습니다.`;
    case "HordeKill":
      return `${event.killerName}님이 공허 유충을 처치했습니다.`;
    case "HeraldKill":
      return `${event.killerName}님이 협곡의 전령을 처치했습니다.`;
    case "BaronKill":
      return `${event.killerName}님이 바론을 처치했습니다.`;
    case "DragonKill":
      return `${event.killerName}님이 드래곤을 처치했습니다.`;
    case "GameEnd":
      return event.result === "Win" ? "샘플 경기가 승리로 끝났습니다." : "샘플 경기가 패배로 끝났습니다.";
    default:
      return null;
  }
}

/** 정규화한 경기 이벤트를 preload가 허용한 단일 IPC 채널로 전달한다. */
function emitGameEvent(event, source) {
  const message = mapGameEvent(event);
  if (!message || !mainWindow || mainWindow.isDestroyed()) return;

  mainWindow.webContents.send("game-events:event", {
    eventName: event.eventName,
    message,
    source,
    occurredAt: new Date().toISOString(),
  });
}

/** 샘플 경기 timer를 모두 해제해 재시작 시 이벤트가 중복되지 않게 한다. */
function stopSampleEvents() {
  eventTimers.forEach(clearTimeout);
  eventTimers = [];
}

/** 외부 게임 없이 동일한 renderer 흐름을 확인할 수 있도록 고정 타임라인을 재생한다. */
function startSampleEvents() {
  stopSampleEvents();
  sampleEvents.forEach((event, index) => {
    eventTimers.push(setTimeout(() => emitGameEvent(event, "sample"), index * 1_400));
  });
}

/** 경기 중에만 노출되는 Live Client Data에서 아직 처리하지 않은 이벤트를 가져온다. */
async function pollLeagueEvents() {
  try {
    const response = await axios.get("https://127.0.0.1:2999/liveclientdata/eventdata", {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      timeout: 1_000,
    });

    const events = Array.isArray(response.data?.Events) ? response.data.Events : [];
    events
      .filter((event) => Number(event.EventID) > lastLeagueEventId)
      .forEach((event) => {
        lastLeagueEventId = Math.max(lastLeagueEventId, Number(event.EventID));
        emitGameEvent(
          {
            eventName: event.EventName,
            killerName: event.KillerName,
            victimName: event.VictimName,
            killStreak: event.KillStreak,
            result: event.Result,
          },
          "league",
        );
      });
  } catch {
    // League Live Client API is available only while a match is running.
  }
}

/** polling, Gameflow 구독, League 연결을 하나의 생명주기로 함께 정리한다. */
function stopLeagueEvents() {
  if (leaguePollTimer) clearInterval(leaguePollTimer);
  leaguePollTimer = undefined;
  lastLeagueEventId = -1;

  if (leagueSubscription && typeof leagueSubscription.unsubscribe === "function") {
    leagueSubscription.unsubscribe();
  }
  leagueSubscription = undefined;

  if (leagueConnection && typeof leagueConnection.close === "function") {
    leagueConnection.close();
  }
  leagueConnection = undefined;
}

/** Gameflow phase를 구독하고 실제 경기가 진행되는 동안에만 이벤트 polling을 유지한다. */
async function startLeagueEvents() {
  stopLeagueEvents();
  const { createWebSocketConnection } = await import("league-connect");
  leagueConnection = await createWebSocketConnection({
    authenticationOptions: { awaitConnection: true },
  });
  leagueSubscription = leagueConnection.subscribe("/lol-gameflow/v1/session", (session) => {
    const phase = session?.phase;
    if (phase === "GameStart" || phase === "InProgress") {
      if (!leaguePollTimer) leaguePollTimer = setInterval(pollLeagueEvents, 1_000);
    } else if (phase === "WaitingForStats" || phase === "EndOfGame") {
      stopLeagueEvents();
    }
  });
}

/** 설정된 실행 모드에 맞는 경기 이벤트 공급자를 시작한다. */
async function startGameEvents() {
  if (appMode === "real") {
    try {
      await startLeagueEvents();
      return { mode: "real", started: true };
    } catch {
      stopLeagueEvents();
      return {
        mode: "real",
        started: false,
        message: "League Client를 찾지 못했습니다. 앱의 다른 기능은 계속 사용할 수 있습니다.",
      };
    }
  }

  startSampleEvents();
  return { mode: "mock", started: true };
}

/** 앱 종료와 사용자의 중지 요청이 같은 정리 경로를 사용하도록 한다. */
function stopGameEvents() {
  stopSampleEvents();
  stopLeagueEvents();
}

/** 개발 서버 또는 패키지 내부 파일만 현재 BrowserWindow 안에서 탐색하도록 제한한다. */
function isTrustedNavigation(url) {
  if (app.isPackaged) return url.startsWith("file:");
  return url.startsWith(developmentUrl);
}

async function loadRenderer(window) {
  if (app.isPackaged) {
    await window.loadFile(join(app.getAppPath(), "dist", "index.html"));
  } else {
    await window.loadURL(developmentUrl);
  }
}

/**
 * 공통 React renderer를 안전한 Electron 창으로 감싼다.
 * renderer에는 Node 권한을 주지 않고 preload의 명시적 IPC API만 노출한다.
 */
async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1_440,
    height: 900,
    minWidth: 1_100,
    minHeight: 720,
    frame: false,
    icon: iconPath,
    title: "까까 | 친구의 게임을 함께 보는 라이브 커뮤니티",
    show: false,
    webPreferences: {
      preload: join(currentDir, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://") || url.startsWith("http://")) shell.openExternal(url);
    return { action: "deny" };
  });
  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (!isTrustedNavigation(url)) {
      event.preventDefault();
      if (url.startsWith("https://") || url.startsWith("http://")) shell.openExternal(url);
    }
  });

  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => {
    mainWindow = undefined;
  });

  mainWindow.webContents.on("before-input-event", (event, input) => {
    if (input.type !== "keyDown") return;
    if (input.key === "F5") {
      event.preventDefault();
      mainWindow?.reload();
    }
    if (input.key === "F12" && !app.isPackaged) {
      event.preventDefault();
      mainWindow?.webContents.toggleDevTools();
    }
  });

  await loadRenderer(mainWindow);
}

function createTray() {
  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon);
  tray.setToolTip("까까");
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: "까까 열기", click: () => mainWindow?.show() },
      { type: "separator" },
      { label: "종료", click: () => app.quit() },
    ]),
  );
  tray.on("double-click", () => mainWindow?.show());
}

function registerIpcHandlers() {
  ipcMain.on("window:minimize", () => mainWindow?.minimize());
  ipcMain.on("window:toggle-maximize", () => {
    if (!mainWindow) return;
    if (mainWindow.isMaximized()) mainWindow.restore();
    else mainWindow.maximize();
  });
  ipcMain.on("window:hide", () => mainWindow?.hide());
  ipcMain.handle("runtime:get-info", () => ({ appMode, isPackaged: app.isPackaged }));
  ipcMain.handle("game-events:start", startGameEvents);
  ipcMain.handle("game-events:stop", () => {
    stopGameEvents();
    return { stopped: true };
  });
  ipcMain.handle("notification:show", (_event, payload) => {
    const title = typeof payload?.title === "string" ? payload.title.slice(0, 80) : "까까";
    const body = typeof payload?.body === "string" ? payload.body.slice(0, 240) : "새 소식이 있습니다.";
    new Notification({ title, body, icon: iconPath }).show();
    return { shown: true };
  });
}

app.whenReady().then(async () => {
  registerIpcHandlers();
  await createWindow();
  createTray();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("before-quit", stopGameEvents);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
