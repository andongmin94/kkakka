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
    console.log(response.data);
    electron.ipcRenderer.send("Riot Game Info", response.data);
  };

  const name = "안동민";
  const summonerName = async () => {
    const response = await axios({
      method: "get",
      url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=RGAPI-5e6e3673-e71c-444e-a1c5-daf93b05d0fd`,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "https://developer.riotgames.com",
      },
    });

    electron.ipcRenderer.send("Riot Game Info", response.data);
  };

  return (
    <div>
      <div className="w-full">
        <Slider />
      </div>
      <br />
      <br />
      <button onClick={handleClick}>Click Me</button>
      <br />
      <br />
      <button onClick={summonerName}>Click Me</button>
    </div>
  );
}
