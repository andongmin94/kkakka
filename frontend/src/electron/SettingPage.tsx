import axios from "axios";
const electron = window.electron;
import { Slider } from "@/components/ui/slider";

export default function SettingPage() {
  electron.on('channel-name', () => { console.log("리액트에서 받았음") });
  const handleClick = () => { electron.send('button-clicked', '리액트에서 보냄') };
  const summonerName = async () => {
    let sname = "안동민";
    const response = await axios({
      method: "get",
      url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sname}?api_key=${import.meta.env.VITE_Riot_API_KEY}`,
    });
    console.log(response.data);
  };
  
  const handleTransparencyChange = (value : any = 100) => {
    // 투명도 값이 변경될 때의 로직을 여기에 추가
    document.body.style.backgroundColor = `rgba(255, 255, 255, ${value / 100})`;
    console.log("Transparency changed:", value);
  };

  /// 환경 체크
  if (typeof electron !== 'undefined') {
    // 일렉트론 환경
    console.log('일렉트론 애플리케이션에서 실행 중입니다.');
  } else {
    // 브라우저 환경
    console.log('웹 브라우저에서 실행 중입니다.');
  }

  return (
    <div>
      <div >
        <Slider onValueChange={handleTransparencyChange} className="w-40"/>
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
