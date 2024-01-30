const { contextBridge, ipcRenderer } = require('electron');

// IPC Renderer를 전역 객체에 주입
contextBridge.exposeInMainWorld('electron', { ipcRenderer });