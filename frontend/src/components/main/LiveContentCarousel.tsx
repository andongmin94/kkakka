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
  // 라이브 시연용 정적 데이터
  // const dumyData = {
  //   crowdDtoList: [
  //     {
  //       attenderEmail: "osy9536@kakao.com",
  //       attenderName: "seyoung",
  //       attenderProfileImg:
  //         "https://ssafys3.s3.ap-northeast-2.amazonaws.com/static/77203%EB%A1%A4%20%EB%B0%B0%EA%B2%BD3.jpg",
  //     },
  //     {
  //       attenderEmail: "wjsaos2081@naver.com",
  //       attenderName: "전수민",
  //       attenderProfileImg:
  //         "http://k.kakaocdn.net/dn/bLSiqo/btsDber5yMF/cfEfzDOI6o2uKf4tpyE0gk/img_640x640.jpg",
  //     },
  //     {
  //       attenderEmail: "k1016h@naver.com",
  //       attenderName: "김상훈",
  //       attenderProfileImg:
  //         "http://k.kakaocdn.net/dn/bRxAkP/btszbVDS8yt/yJ7vKkqIRaC5WTkCUX4c40/img_640x640.jpg",
  //     },
  //     {
  //       attenderEmail: "soomin0608@naver.com",
  //       attenderName: "이수민",
  //       attenderProfileImg:
  //         "http://k.kakaocdn.net/dn/xAsX2/btqTMb7ZixW/ig7lKVvDl5vo7f31CTIJe1/img_640x640.jpg",
  //     },
  //     {
  //       attenderEmail: "lhg7485@naver.com",
  //       attenderName: "이해건",
  //       attenderProfileImg:
  //         "http://k.kakaocdn.net/dn/JnpyP/btsBgIpRoVv/EztKyKYNFqZcyxVPde2B81/img_640x640.jpg",
  //     },
  //   ],
  //   playerAlias: "천재개발자",
  //   playerBackgroundPic:
  //     "https://ssafys3.s3.ap-northeast-2.amazonaws.com/back_img/%EB%A1%A4+%EB%B0%B0%EA%B2%BD.jpg",
  //   playerEmail: "k1016h@naver.com",
  //   playerId: 5,
  //   playerName: "김상훈",
  //   playerProfilePic:
  //     "http://k.kakaocdn.net/dn/bRxAkP/btszbVDS8yt/yJ7vKkqIRaC5WTkCUX4c40/img_640x640.jpg",
  //   roomId: 5,
  //   roomTitle: "30대 아재 리신 검거",
  // };

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
        console.log("뱅송목록", res.data.data);
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
              className="md:basis-1/1 lg:basis-1/2 pl-6"
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
