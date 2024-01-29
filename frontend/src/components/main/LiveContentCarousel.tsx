import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import LiveContent from "@/components/main/LiveContent";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useMainStore } from "@/stores/MainStore";
import { useEffect } from "react";

export default function LiveContentCarousel() {
  // 라이브 유저 수 더미 데이터

  const { fetchLiveBroadcastList, liveBroadcastList } = useMainStore();

  useEffect(() => {
    fetchLiveBroadcastList();
  }, [fetchLiveBroadcastList]);

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

  const plugin = React.useRef(
    // 딜레이 시간 조절
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );
  return (
    <Carousel
      opts={{ align: "start" }}
      plugins={[plugin.current]}
      className="h-full w-full"
    >
      <CarouselContent>
        {liveBroadcastList &&
          Array.isArray(liveBroadcastList) &&
          liveBroadcastList.map((room, index) => (
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
