declare global {
  interface Window {
    electron: typeof import('electron');
  }
}

const electron =  window.electron;

import { Button } from "@/components/ui/button"

export default function TitleBar() {
  const minimize = () => {
    electron.ipcRenderer.send('minimize');
  };
  const maximize = () => {
    electron.ipcRenderer.send('maximize');
  }
  const hidden = () => {
    electron.ipcRenderer.send('hidden');
  }
  return (
    <div className="flex justify-end border-blue-200 mt-2 mb-10">
      <div className="fixed z-10">
      <Button onClick={minimize}>-</Button>&nbsp;
      <Button onClick={maximize}>ㅁ</Button>&nbsp;
      <Button onClick={hidden}>X</Button>
      </div>
    </div>
  )
}
