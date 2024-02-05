import LiveProfile from "./LiveProfile";
import Live from "@/components/ani/Live";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BroadcastItemType } from "@/types/broadcastTypes";
import useDmEnterPost from "@/apis/dm/mutations/useDmEnterPost";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function LiveContent({
  liveData,
}: {
  liveData: BroadcastItemType;
}) {
  console.log("liveData", liveData);
  const playerEmail = liveData.playerEmail;

  const handleEnterRoom = useCallback(() => {
    useDmEnterPost({ playerEmail });
  }, []);

  return (
    // 배너 이미지 - 배경이미지는 api로 아직 안들어와서 일단 이렇게 처리했어요
    <Card
      className={`border-solid border-4 rounded-3xl bg-[url(${liveData.playerKakaoImg})] bg-cover h-[15rem] w-[23rem] grid grid-rows-5 lg:hover:scale-105 transition-transform ease-in-out duration-500`}
    >
      <CardHeader className="p-1 grid grid-cols-2">
        <Live />
        <div className="flex justify-end">
          {/* 채팅방에 들어온 친구 수 만큼 친구 프사 표시 */}
          {liveData.crowdDtoList &&
            Array.isArray(liveData.crowdDtoList) &&
            liveData.crowdDtoList.map((crowd, id) => {
              return (
                <div
                  key={id}
                  // 이유는 모르겠는데 여기서만 특정 이미지가 안나옴
                  // className="rounded-full border-[3px] h-10 w-10 border-red-500 bg-[url('/image/joinSample.png')] bg-cover"
                  className={`rounded-full border-[3px] h-10 w-10 border-red-500 bg-[url('${crowd.profilePic}')] bg-cover`}
                />
              );
            })}
        </div>
      </CardHeader>
      <CardContent className="p-1 row-span-2">
        <Button>
          <Link to={"/main"} onClick={() => handleEnterRoom()}>
            입장하기
          </Link>
        </Button>
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
