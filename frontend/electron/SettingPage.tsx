import { Slider } from "@/components/ui/slider";
import axios from "axios";

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

  const summonerName = async () => {
    let sname = "안동민";
    const response = await axios({
      method: "get",
      url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sname}?api_key=${import.meta.env.VITE_Riot_API_KEY}`,
    });
    console.log(response.data);
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
      <br />
    </div>
  );
}
