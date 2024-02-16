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
    <>
      <Card
        onClick={() => {
          enterLiveHandler(liveData);
        }}
        className={` rounded-3xl border-none w-[470px] h-[350px] grid grid-rows-6 p-5 shadow-lg relative`}
        style={{
          backgroundImage: `url("${liveData.playerBackgroundPic}")`,
          backgroundSize: "cover",
          boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.8)",
        }}
      >
        <CardHeader className="p-1 grid grid-cols-2 relative">
          <div className="absolute left-0 z-20">
            <Live />
          </div>

          <div className=" w-[200px] absolute right-0">
            {/* 채팅방에 들어온 친구 수 만큼 친구 프사 표시 */}
            {liveData.crowdDtoList &&
              Array.isArray(liveData.crowdDtoList) &&
              liveData.crowdDtoList.slice(0, 6).map((crowd, index) => {
                return (
                  <div
                    key={crowd.attenderName}
                    className={`rounded-full border-[1px] h-10 w-10 absolute shadow-lg`}
                    style={{
                      backgroundImage: `url("${crowd.attenderProfileImg}")`,
                      backgroundSize: "cover",
                      left: `${index * 30}px`,
                      zIndex: index + 30,
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.8)",
                    }}
                  />
                );
              })}
          </div>
        </CardHeader>
        <CardContent className="p-1 row-span-5"></CardContent>
        <CardFooter className="p-1 row-span-2 z-20">
          {/* 플레이중인 친구 프사 props로 전달) */}
          <LiveProfile
            playerName={liveData.playerName}
            roomTitle={liveData.roomTitle}
            playerProfilePic={liveData.playerProfilePic}
          />
        </CardFooter>
        {/* 오버레이 */}
        <Card className="bg-black bg-opacity-65 z-10  rounded-3xl border-none w-full h-full grid grid-rows-6  p-5 shadow-lg absolute top-0 left-0"></Card>
      </Card>
    </>
  );
}
