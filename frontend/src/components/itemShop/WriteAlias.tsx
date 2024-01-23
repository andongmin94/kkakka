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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Price from "./price";
import Purchase from "./Purchase";

export default function WhriteAlias() {
  return (
    <Card className="static group/item bg-[url('/image/whriteAliasBg.png')] border-solid border-4 rounded-3xl bg-cover h-[23rem] w-[23rem] lg:hover:scale-105 transition-transform ease-in-out duration-500">
      <div className="flex flex-col items-center">
        <img src="/image/whriteAlias.png" className="h-20 w-20" />
        <p className="text-4xl mt-3 font-bold text-white">칭호 지정권</p>
        <p className="text-xl mt-10 font-bold text-white mx-10">
          상대방의 칭호를 지정할 수 있는 아이템. 원하는 친구에게 사용이
          가능하다. 아이템 구매 즉시 사용된다. 칭호는 6글자로 제한된다.
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
            <DialogTitle className="flex flex-col justify-center text-3xl">
              칭호 지정권
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
          <div className="flex justify-center w-full mb-5 mt-5">
            <div className="flex w-full">
              <Label
                htmlFor="name"
                className="text-right font-bold text-lg w-[200px] flex items-center"
              >
                칭호를 입력하세요
              </Label>
              <Input id="name" defaultValue="" className="ml-3" />
            </div>
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
              type="button"
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
