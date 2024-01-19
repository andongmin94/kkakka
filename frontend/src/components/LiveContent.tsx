import Live from "@/components/ani/Live";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-md", className)} {...props} />;
}

export default function LiveContent () {
  // 임시 친구 데이터
  const sampleData: number[] = [1, 2, 3, 4];
  return (
    // 배너 이미지
    <Card className="border-solid border-4 rounded-3xl bg-[url('/image/liveImage.PNG')] bg-cover h-[15rem] w-[23rem] grid grid-rows-5 lg:hover:scale-105 transition-transform ease-in-out duration-500">
      <CardHeader className="p-1 grid grid-cols-2">
        <Live />
        <div className="flex justify-end">
          {/* 채팅방에 들어온 친구 수 만큼 친구 프사 표시 */}
          {sampleData.map((_, idx) => {
            return (
              <div
                key={idx}
                className="rounded-full border-[3px] h-10 w-10 border-red-500 bg-[url('/image/joinSample.png')] bg-cover"
              />
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="p-1 row-span-2"></CardContent>
      <CardFooter className="p-2 row-span-2">
        {/* 플레이중인 친구 프사 */}
        <div className="flex items-center space-x-3">
          <Skeleton className="w-[100px] h-[80px] rounded-full border-4  border-red-500 bg-[url('/image/profileImage.PNG')] bg-cover" />
          <div className="space-y-2">
            <Skeleton className="h-auto grid grid-rows-1 place-items-stretch">
              {/* 제목 칸 */}
              <div className="self-center text-2xl px-1">
                페이커와 전수민은 취향차이 !!
              </div>
            </Skeleton>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
