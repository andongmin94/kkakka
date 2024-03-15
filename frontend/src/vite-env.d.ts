/// <reference types="vite/client" />

type DesktopRuntimeInfo = {
  appMode: "mock" | "real";
  isPackaged: boolean;
};

type DesktopGameEvent = {
  eventName: string;
  message: string;
  source: "sample" | "league";
  occurredAt: string;
};

type StartGameEventsResult = {
  mode: "mock" | "real";
  started: boolean;
  message?: string;
};

interface KkakkaElectronBridge {
  readonly isDesktop: true;
  minimize: () => void;
  toggleMaximize: () => void;
  hide: () => void;
  getRuntimeInfo: () => Promise<DesktopRuntimeInfo>;
  startGameEvents: () => Promise<StartGameEventsResult>;
  stopGameEvents: () => Promise<{ stopped: boolean }>;
  onGameEvent: (callback: (event: DesktopGameEvent) => void) => () => void;
  showNotification: (payload: { title?: string; body?: string }) => Promise<{ shown: boolean }>;
}

declare global {
  interface Window {
    electron?: KkakkaElectronBridge;
  }
}

export {};
