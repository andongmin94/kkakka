import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function TitleItemshop() {
  return (
    <Card className="static group/item bg-[url('/image/deleteAliasBg.png')] border-solid border-4 rounded-3xl bg-cover h-[23rem] w-[23rem] lg:hover:scale-105 transition-transform ease-in-out duration-500">
      <div className="flex flex-col items-center">
        <img src="/image/deleteCollection.png" className="h-20 w-20 pt-3" />
        <p className="text-4xl mt-3 font-bold text-white">도감 삭제권</p>
        <p className="text-xl mt-10 font-bold text-white mx-10">
          내 도감에 들어있는 게시물을 1개 선택하여 삭제하는 아이템이다. 본인의
          도감에만 사용가능하다. 아이템 구매 즉시 사용된다. 삭제된 도감은 복구가
          불가능하다.
        </p>
      </div>

      {/* 호버 */}
      <div className="opacity-50 absolute top-[-4px] right-[-4px] border-solid border-4 rounded-3xl bg-slate-400 h-[23rem] w-[23rem] group/edit invisible group-hover/item:visible" />
      <div className="group/edit invisible group-hover/item:visible h-[23rem] w-[23rem] grid place-items-center z-10">
        <Link
          to="/"
          className="absolute top-[150px] rounded-xl h-[4rem] w-[15rem] grid place-items-center bg-white z-20 font-dnf lg:hover:scale-105 transition-transform ease-in-out duration-500"
        >
          <div className="flex flex-row justify-content-center gap-4">
            <img src="/image/coins.png" className="h-10 w-10" />
            <span className="self-center text-2xl font-bold">1,000 P</span>
          </div>
        </Link>
        <Link
          to="/"
          className="absolute top-[250px] rounded-xl h-[4rem] w-[15rem] grid place-items-center bg-slate-500 z-20 font-dnf lg:hover:scale-105 transition-transform ease-in-out duration-500"
        >
          <div className="flex flex-row justify-content-center gap-4">
            <span className="self-center text-2xl text-white font-bold">
              구매하기
            </span>
          </div>
        </Link>
      </div>
    </Card>
  );
}
