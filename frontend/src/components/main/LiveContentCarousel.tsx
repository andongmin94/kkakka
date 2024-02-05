import { useRef, useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import { CardContent } from "@/components/ui/card";
import LiveContent from "@/components/main/LiveContent";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useBroadcastListQuery from "@/apis/broadcast/queries/useBroadcastListQuery";

export default function LiveContentCarousel() {
  const { broadcasts, isLoading, error } = useBroadcastListQuery();

  const plugin = useRef(
    // 딜레이 시간 조절
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.{error.message}</div>;

  if (!broadcasts || broadcasts.length === 0) {
    return <div>플레이 중인 친구가 없습니다.</div>;
  }

  return (
    <Carousel
      opts={{ align: "start" }}
      plugins={[plugin.current]}
      className="h-full w-full"
    >
      <CarouselContent>
        {Array.isArray(broadcasts) &&
          broadcasts.map((room, index) => (
            <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/3">
              <div className="p-1">
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <LiveContent liveData={room} />
                </CardContent>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}

// 라이브 유저 수 더미 데이터

// const liveData = [
//   {
//     userId: 1,
//     title: "3연승하고 잔다",
//     profileImage: "/image/profileImage.png",
//     bgImage: "/image/liveImage.png",
//     friends: [
//       { id: 1, image: "/image/joinSample.png" },
//       { id: 2, image: "/image/joinSample.png" },
//       { id: 3, image: "/image/joinSample.png" },
//       { id: 4, image: "/image/joinSample.png" },
//     ],
//   },
//   {
//     userId: 1,
//     title: "2연승하고 잔다",
//     profileImage: "/image/profileImage.png",
//     bgImage: "/image/liveImage.png",
//     friends: [
//       { id: 1, image: "/image/joinSample.png" },
//       { id: 2, image: "/image/joinSample.png" },
//       { id: 3, image: "/image/joinSample.png" },
//       { id: 4, image: "/image/joinSample.png" },
//     ],
//   },
//   {
//     userId: 1,
//     title: "1연승하고 잔다",
//     profileImage: "/image/profileImage.png",
//     bgImage: "/image/liveImage.png",
//     friends: [
//       { id: 1, image: "/image/joinSample.png" },
//       { id: 2, image: "/image/joinSample.png" },
//       { id: 3, image: "/image/joinSample.png" },
//       { id: 4, image: "/image/joinSample.png" },
//     ],
//   },
//   {
//     userId: 1,
//     title: "6연승하고 잔다",
//     profileImage: "/image/profileImage.png",
//     bgImage: "/image/liveImage.png",
//     friends: [
//       { id: 1, image: "/image/joinSample.png" },
//       { id: 2, image: "/image/joinSample.png" },
//       { id: 3, image: "/image/joinSample.png" },
//       { id: 4, image: "/image/joinSample.png" },
//     ],
//   },
// ];
