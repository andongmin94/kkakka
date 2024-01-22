import LiveProfile from "./LiveProfile";
import Live from "@/components/ani/Live";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface data {
  userId: number;
  title: string;
  profileImage: string;
  bgImage: string;
  friends: { id: number; image: string }[];
}

export default function LiveContent({ data }: { data: data }) {
  return (
    // 배너 이미지
    <Card
      className={`border-solid border-4 rounded-3xl bg-[url('${data.bgImage}')] bg-cover h-[15rem] w-[23rem] grid grid-rows-5 lg:hover:scale-105 transition-transform ease-in-out duration-500`}
    >
      <CardHeader className="p-1 grid grid-cols-2">
        <Live />
        <div className="flex justify-end">
          {/* 채팅방에 들어온 친구 수 만큼 친구 프사 표시 */}
          {data.friends.map((friend, id) => {
            return (
              <div
                key={id}
                // 이유는 모르겠는데 여기서만 특정 이미지가 안나옴
                className="rounded-full border-[3px] h-10 w-10 border-red-500 bg-[url('/image/joinSample.png')] bg-cover"
              />
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="p-1 row-span-2"></CardContent>
      <CardFooter className="p-2 row-span-2">
        {/* 플레이중인 친구 프사 props로 전달) */}
        <LiveProfile
          userId={data.userId}
          text={data.title}
          profileImage={data.profileImage}
        />
      </CardFooter>
    </Card>
  );
}
