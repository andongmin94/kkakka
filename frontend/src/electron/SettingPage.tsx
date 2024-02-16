import axios from "axios";
const electron = window.electron;
// import { Slider } from "@/components/ui/slider";

export default function SettingPage() {
  /// 환경 체크
  if (typeof electron !== "undefined") {
    // 일렉트론 환경
    console.log("일렉트론 애플리케이션에서 실행 중입니다.");
  } else {
    // 브라우저 환경
    console.log("웹 브라우저에서 실행 중입니다.");
  }

  const handleClick = () => {
    electron.send("button-clicked", "리액트에서 보냄");
  };
  const summonerName = async () => {
    let sname = "안동민";
    const response = await axios({
      method: "get",
      url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sname}?api_key=${
        import.meta.env.VITE_Riot_API_KEY
      }`,
    });
    console.log(response.data);
  };

  function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      // var notification = new Notification("Hi there!");
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          // var notification = new Notification("Hi there!");
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }
  return (
    <div>
      <br />
      <br />
      <button onClick={handleClick}>Click Me</button>
      <br />
      <br />
      <button onClick={summonerName}>Click Me</button>
      <br />
      <br />
      <button onClick={notifyMe}>Notify me!</button>
      <br />
    </div>
  );
}
