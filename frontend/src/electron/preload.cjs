const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  isDesktop: true,
  minimize: () => ipcRenderer.send("window:minimize"),
  toggleMaximize: () => ipcRenderer.send("window:toggle-maximize"),
  hide: () => ipcRenderer.send("window:hide"),
  getRuntimeInfo: () => ipcRenderer.invoke("runtime:get-info"),
  startGameEvents: () => ipcRenderer.invoke("game-events:start"),
  stopGameEvents: () => ipcRenderer.invoke("game-events:stop"),
  onGameEvent: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on("game-events:event", listener);
    return () => ipcRenderer.removeListener("game-events:event", listener);
  },
  showNotification: (payload) => ipcRenderer.invoke("notification:show", payload),
});
