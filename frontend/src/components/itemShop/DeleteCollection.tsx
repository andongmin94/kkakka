// import Purchase from "./Purchase";
import { useEffect, useState, useRef } from "react";
import classes from "./ItemShopCard.module.css";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  // DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { ProfileDogamType } from "@/types/dogamTypes";

export default function TitleItemshop({
  itemName,
  itemPrice,
  myPoint,
}: {
  itemName: string;
  itemPrice: number;
  myPoint: number;
}) {
  const token = localStorage.getItem("token");

  const [dogamList, setDogamList] = useState<ProfileDogamType[]>([]);

  const GetMyDogamList = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/friends/dogam`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res: any) => {
        console.log(res.data);
        setDogamList([...res.data.data]);
      });
  };

  const DeleteMyDogam = (dogamId: number) => {
    axios
      .delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/dogam/${dogamId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetMyDogamList();
  }, []);

  const CarouselSize = ({ dogamList }: { dogamList: ProfileDogamType[] }) => {
    return (
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {dogamList.map((dogam, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent
                    className="flex aspect-square items-center justify-center p-3"
                    style={{
                      backgroundImage: `url(${dogam.dogamImgUrl})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <span className="text-3xl font-semibold">
                      <Button
                        style={{ position: "relative", top: "10rem" }}
                        variant="destructive"
                        onClick={() => DeleteMyDogam(dogam.dogamId)}
                      >
                        삭제!
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            style={{
                              position: "relative",
                              top: "10rem",
                              margin: 10,
                            }}
                            variant="outline"
                          >
                            상세정보 보기
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">
                                {dogam.dogamTitle}{" "}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {/* 이걸 선물한 사람: {dogam.friendName} -- 이 정보는 안 받고있음*/}
                              </p>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  };

  // Item Card CSS 세팅
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && overlayRef.current) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const rotateY = (-1 / 5) * x + 20;
      const rotateX = (4 / 30) * y - 20;

      overlayRef.current.style.filter = "opacity(10)";
      overlayRef.current.style.backgroundPosition = ` ${160 - x}% ${250 - y}%`;

      containerRef.current.style.transform = `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseOut = () => {
    if (overlayRef.current && containerRef.current) {
      overlayRef.current.style.filter = "opacity(0)";
      containerRef.current.style.transform =
        "perspective(350px) rotateY(0deg) rotateX(0deg)";
    }
  };

  return (
    <Card className="border-0">
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={`${classes.itemElemContainer}`}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
          >
            <div
              className={`${classes.itemElemOverlay}`}
              ref={overlayRef}
            ></div>
            <div className={`${classes.itemElemCard}`}>
              <h1 className={`${classes.itemElemContent}`}>도감삭제권</h1>
            </div>
          </div>
        </DialogTrigger>

        {/* 모달 부분 */}
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center text-3xl">
              <div className="mb-3">{itemName}</div>

              <div className="rounded-xl h-[4rem] w-[15rem] grid place-items-center bg-white">
                <div className="flex flex-row justify-content-center gap-4">
                  <img src="/image/coins.png" className="h-10 w-10" />
                  <span className="self-center text-2xl font-bold">
                    {itemPrice}
                  </span>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* 본문 */}
          <div className="flex justify-center w-full" />
          <div className="font-bold text-center">
            <div className="overflow-y-auto scrollbar-hide flex-now">
              <CarouselSize dogamList={dogamList} />
            </div>
            구입 후 잔여 포인트 {myPoint - itemPrice} P
          </div>
          <DialogFooter className="flex sm:justify-center"></DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
