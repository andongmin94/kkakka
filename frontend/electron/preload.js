<<<<<<< HEAD
const { contextBridge, ipcRenderer } = require('electron');

// IPC Renderer를 전역 객체에 주입
contextBridge.exposeInMainWorld('electron', { ipcRenderer });
=======
// preload.cjs
const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("myButton");
  button.addEventListener("click", () => {
    ipcRenderer.send("button-clicked");
    console.log("preload");
  });
});
>>>>>>> a8b968133813014051efcbbcccce8ec3724b9772
