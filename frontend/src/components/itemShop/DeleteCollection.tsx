import Price from "./Price";
// import Purchase from "./Purchase";
import { useEffect, useState } from "react";
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
  itemDesc,
  myPoint,
}: {
  itemName: string;
  itemPrice: number;
  itemDesc: string;
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

  return (
    <Card className="static group/item bg-[url('/image/deleteAliasBg.png')] border-solid border-4 rounded-3xl bg-cover h-[23rem] w-[23rem] lg:hover:scale-105 transition-transform ease-in-out duration-500">
      <div className="flex flex-col items-center">
        <img src="/image/deleteCollection.png" className="h-20 w-20" />
        <p className="text-4xl mt-3 font-bold text-white">{itemName}</p>
        <p className="text-xl mt-10 font-bold text-white mx-10">{itemDesc}</p>
      </div>

      {/* 호버 */}
      <div className="opacity-50 absolute top-[-4px] right-[-4px] border-solid border-4 rounded-3xl bg-slate-400 h-[23rem] w-[23rem] group/edit invisible group-hover/item:visible" />
      <Dialog>
        <DialogTrigger asChild>
          <div className="group/edit invisible group-hover/item:visible h-[23rem] w-[23rem] grid place-items-center z-10">
            {/* 호버 가격 버튼 */}
            <Price itemPrice={itemPrice} />

            {/* 호버 구매하기 버튼 */}
            {/*<Purchase />*/}
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
