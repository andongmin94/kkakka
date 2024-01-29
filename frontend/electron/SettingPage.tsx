import { Slider } from "@/components/ui/slider";
import axios from "axios";
import https from "https";

declare global {
  interface Window {
    electron: typeof import("electron");
  }
}

const electron = window.electron;

export default function SettingPage() {
  const handleClick = () => {
    electron.ipcRenderer.send("button-clicked", "hi");
    console.log("React button clicked");
  };
  const gameInfo = async () => {
    const response = await axios({
      method: "get",
      url: "https://127.0.0.1:2999/liveclientdata/eventdata",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, // 허가되지 않은 인증을 reject하지 않겠다!
      }),
    });

    electron.ipcRenderer.send("Riot Game Info", response.data);
  };

  return (
    <div>
      <div className="w-80">
        <Slider />
      </div>
      <button onClick={handleClick}>Click Me</button>

      <button onClick={gameInfo}>Click Me</button>
    </div>
  );
}
