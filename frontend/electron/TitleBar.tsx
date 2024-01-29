declare global {
  interface Window {
    electron: typeof import("electron");
  }
}

const electron = window.electron;

import { Button } from "@/components/ui/button";
import { Menubar } from "@/components/ui/menubar";

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

    <Menubar className="fixed flex justify-end mt-2 bg-background sticky top-0 z-40 w-full border-b" style={{ '-webkit-app-region': 'drag' } as React.CSSProperties}>
      <div className="fixed z-10">
        <Button onClick={minimize} style={{ '-webkit-app-region': 'no-drag' } as React.CSSProperties}>-</Button>&nbsp;
        <Button onClick={maximize} style={{ '-webkit-app-region': 'no-drag' } as React.CSSProperties}>ㅁ</Button>&nbsp;
        <Button onClick={hidden} style={{ '-webkit-app-region': 'no-drag' } as React.CSSProperties}>X</Button>
      </div>
    </Menubar>

  );
}
