import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import LiveContent from "@/components/LiveContent";

export default function () {
  // 라이브 유저 수 더미 데이터
  const data: number[] = [1, 2, 3, 4, 5, 6];
  const plugin = React.useRef(
    // 딜레이 시간 조절
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[plugin.current]}
      className="h-full w-full"
    >
      <CarouselContent>
        {data.map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/3">
            <div className="p-1">
              <CardContent className="flex aspect-square items-center justify-center p-0">
                <LiveContent />
              </CardContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
