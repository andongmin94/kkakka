// preload.cjs
const { ipcRenderer } = require('electron');

// window.addEventListener('DOMContentLoaded', () => {
  
// });

const button = document.getElementById('myButton');
  button.addEventListener('click', () => {
    ipcRenderer.send('button-clicked');
    console.log('preload');
  });