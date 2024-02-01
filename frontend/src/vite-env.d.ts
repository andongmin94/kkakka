/// <reference types="vite/client" />

interface electron {
  send: (channel: string, data: any) => void;
  on: (channel: string, func: (event: any, ...args: any[]) => void) => void;
  removeAllListeners: (channel: string) => void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export {};