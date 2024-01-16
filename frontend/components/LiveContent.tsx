"use client";
import Live from "./ani/Live";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export default function () {
  // 임시 친구 데이터
  const sampleData: number[] = [1, 2, 3, 4];
  return (
    // 배너 이미지 넣는곳
    <Card className="border-solid border-4 rounded-3xl bg-[url('/image/liveImage.PNG')] bg-cover h-[15rem] w-[25rem] grid grid-rows-5 lg:hover:scale-105 transition-transform ease-in-out duration-500">
      <CardHeader className="p-1 grid grid-cols-2">
        <Live />
        <div className="flex justify-end">
          {/* 채팅방에 들어온 친구 수 만큼 친구 프사 표시 */}
          {sampleData.map((data, idx) => {
            return (
              <div
                key={idx}
                className="rounded-full border-[3px] h-10 w-10 border-red-500 bg-[url('/image/joinSample.PNG')] bg-cover"
              />
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="p-1 row-span-2"></CardContent>
      <CardFooter className="p-2 row-span-2">
        {/* 플레이중인 친구 프사 넣는곳*/}
        <div className="rounded-full border-4 h-20 w-20 border-red-500 bg-[url('/image/profileImage.PNG')] bg-cover" />
      </CardFooter>
    </Card>
  );
}
