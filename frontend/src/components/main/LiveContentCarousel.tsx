import { useRef, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { CardContent } from "@/components/ui/card";
import LiveContent from "@/components/main/LiveContent";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import axios from "axios";
import { BroadcastItemType } from "@/types/broadcastTypes";
import Loading from "@/components/app/Loading";

export default function LiveContentCarousel() {
  const plugin = useRef(
    // 딜레이 시간 조절
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const [broadcasts, setBroadcasts] = useState<BroadcastItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/friends/broadcasts`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBroadcasts(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("방송에러", err);
      });
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Carousel
        opts={{ align: "start" }}
        plugins={[plugin.current]}
        className="h-full w-full"
      >
        <CarouselContent className="">
          {broadcasts.map((room) => (
            <CarouselItem
              key={room.roomId}
              className="md:basis-1/1 lg:basis-1/2 mr-5"
            >
              <div className="p-1 mt-3">
                <CardContent className="flex items-center justify-center p-0 lg:hover:scale-105 transition-transform ease-in-out duration-500">
                  <LiveContent liveData={room} />
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
