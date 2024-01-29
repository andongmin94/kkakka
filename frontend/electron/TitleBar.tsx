declare global {
  interface Window {
    electron: typeof import("electron");
  }
}

const electron = window.electron;

import { Button } from "@/components/ui/button";

export default function TitleBar() {
  const minimize = () => {
    electron.ipcRenderer.send("minimize");
  };
  const maximize = () => {
    electron.ipcRenderer.send("maximize");
  };
  const hidden = () => {
    electron.ipcRenderer.send("hidden");
  };
  return (
    <div className="fixed flex gap-1 justify-end z-10 border" style={{ "-webkit-app-region": "drag", width: "99.3%", borderRadius: "8px", margin: "1px", borderColor: "darkorange", backgroundColor: "gold" } as React.CSSProperties }>
      <div style={{ "-webkit-app-region": "no-drag" } as React.CSSProperties}>
        <Button onClick={minimize} className="">-</Button>&nbsp;
        <Button onClick={maximize}>ㅁ</Button>&nbsp;
        <Button onClick={hidden}>X</Button>
      </div>
    </div>
  );
}
