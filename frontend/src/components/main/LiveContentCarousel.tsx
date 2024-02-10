import { useRef, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { CardContent } from "@/components/ui/card";
import LiveContent from "@/components/main/LiveContent";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useBroadcastStore from "@/store/broadcast/broadcastStore";
import { useBroadcastList } from "@/hooks/broadcast/queries/useBroadcastListQuery";

export default function LiveContentCarousel() {
  const plugin = useRef(
    // 딜레이 시간 조절
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const { broadcastList, setBroadcastList } = useBroadcastStore();
  const { useBroadcastListQuery } = useBroadcastList();
  const { data: broadcasts } = useBroadcastListQuery();

  useEffect(() => {
    if (broadcasts) {
      setBroadcastList(broadcasts);
    }
  }, [broadcasts]);

  return (
    <Carousel
      opts={{ align: "start" }}
      plugins={[plugin.current]}
      className="h-full w-full"
    >
      <CarouselContent className="ml-1">
        {broadcastList.map((room) => (
          <CarouselItem
            key={room.roomId}
            className="md:basis-1/1 lg:basis-1/3 mr-5"
          >
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
