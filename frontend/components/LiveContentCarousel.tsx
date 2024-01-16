"use client";

import LiveContent from "@/components/LiveContent";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import * as React from "react";

// npm install embla-carousel-autoplay --save
import Autoplay from "embla-carousel-autoplay";

export default function () {
  // 임시로 넣은 사용자 데이터
  const sampleData: number[] = [1, 2, 3, 4, 5, 6];

  const plugin = React.useRef(
    // 움직이는 시간 입력하는 곳
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="p-4">
          {/* 임시 사용자 수 만큼 배너 생성 */}
          {sampleData.map((data, idx) => {
            return (
              // 한턴에 3개까지
              <CarouselItem key={idx} className="py-3 basis-1/3 ">
                <LiveContent />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </>
  );
}
