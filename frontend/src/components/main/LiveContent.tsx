import LiveProfile from "./LiveProfile";
import Live from "@/components/ani/Live";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BroadcastItemType } from "@/types/broadcastTypes";
// import { Button } from "@/components/ui/button";
import axios from "axios";

export default function LiveContent({
  liveData,
}: {
  liveData: BroadcastItemType;
}) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const enterLiveHandler = (liveData: BroadcastItemType) => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/broadcasts/enter/${
          liveData.playerId
        }`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("라이브데이터");
        console.log(liveData);
        navigate(`/main/liveChat/${res.data.data}`, { state: liveData });
      });
  };

  return (
    <Card
      className={`border-solid border-4 rounded-3xl h-[15rem] w-[23rem] grid grid-rows-5 lg:hover:scale-105 transition-transform ease-in-out duration-500`}
      style={{
        backgroundImage: `url("${liveData.playerBackgroundPic}")`,
        backgroundSize: "cover",
      }}
      onClick={() => {
        enterLiveHandler(liveData);
      }}
    >
      <CardHeader className="p-1 grid grid-cols-2">
        <Live />
        <div className="flex justify-end">
          {/* 채팅방에 들어온 친구 수 만큼 친구 프사 표시 */}
          {liveData.crowdDtoList &&
            Array.isArray(liveData.crowdDtoList) &&
            liveData.crowdDtoList.map((crowd) => {
              return (
                <div
                  key={crowd.attenderId}
                  className={`rounded-full border-[2px] h-10 w-10`}
                  style={{
                    backgroundImage: `url("${crowd.attenderProfileImg}")`,
                    backgroundSize: "cover",
                  }}
                />
              );
            })}
        </div>
      </CardHeader>
      <CardContent className="p-1 row-span-2">
        {/* <Button>입장하기</Button> */}
      </CardContent>
      <CardFooter className="p-2 row-span-2">
        {/* 플레이중인 친구 프사 props로 전달) */}
        <LiveProfile
          playerName={liveData.playerName}
          roomTitle={liveData.roomTitle}
          playerProfilePic={liveData.playerKakaoImg}
        />
      </CardFooter>
    </Card>
  );
}
