import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Price from "./Price";
import Purchase from "./Purchase";

export default function TitleItemshop() {
  return (
    <Card className="static group/item bg-[url('/image/deleteAliasBg.png')] border-solid border-4 rounded-3xl bg-cover h-[23rem] w-[23rem] lg:hover:scale-105 transition-transform ease-in-out duration-500">
      <div className="flex flex-col items-center">
        <img src="/image/deleteCollection.png" className="h-20 w-20" />
        <p className="text-4xl mt-3 font-bold text-white">도감 삭제권</p>
        <p className="text-xl mt-10 font-bold text-white mx-10">
          내 도감에 들어있는 게시물을 1개 선택하여 삭제하는 아이템이다. 본인의
          도감에만 사용가능하다. 아이템 구매 즉시 사용된다. 삭제된 도감은 복구가
          불가능하다.
        </p>
      </div>

      {/* 호버 */}
      <div className="opacity-50 absolute top-[-4px] right-[-4px] border-solid border-4 rounded-3xl bg-slate-400 h-[23rem] w-[23rem] group/edit invisible group-hover/item:visible" />
      <Dialog>
        <DialogTrigger asChild>
          <div className="group/edit invisible group-hover/item:visible h-[23rem] w-[23rem] grid place-items-center z-10">
            {/* 호버 가격 버튼 */}
            <Price />

            {/* 호버 구매하기 버튼 */}
            <Purchase />
          </div>
        </DialogTrigger>

        {/* 모달 부분 */}
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center text-3xl">
              <div className="mb-3">도감 삭제권</div>
              <div className="rounded-xl h-[4rem] w-[15rem] grid place-items-center bg-white">
                <div className="flex flex-row justify-content-center gap-4">
                  <img src="/image/coins.png" className="h-10 w-10" />
                  <span className="self-center text-2xl font-bold">
                    1,000 P
                  </span>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* 본문 */}
          <div className="flex justify-center w-full mb-5 mt-5" />
          <div className="font-bold text-center mb-3">
            <div>도감을 어떻게 선택할지 아직 몰루</div>
            구입 후 잔여 포인트 4000 P
          </div>
          <DialogFooter className="flex sm:justify-center">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="mr-10 border-solid border-2 border-inherit bg-white font-bold h-8 text-lg"
              >
                취소
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="secondary"
              className="mr-10 border-solid border-2 border-inherit bg-white font-bold h-8 text-lg"
            >
              구입
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
