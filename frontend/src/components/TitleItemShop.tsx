import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function TitleItemshop() {
  return (
    <Card className="static group/item bg-[url('/image/liveImage.png')] border-solid border-4 rounded-3xl bg-cover h-[23rem] w-[23rem] grid grid-rows-5 lg:hover:scale-105 transition-transform ease-in-out duration-500">
      <div className="opacity-50 absolute top-[-4px] right-[-4px] border-solid border-4 rounded-3xl bg-slate-400 h-[23rem] w-[23rem] group/edit invisible group-hover/item:visible" />
      <div className="group/edit invisible group-hover/item:visible h-[23rem] w-[23rem] grid place-items-center z-10">
        <Link to="/" className="rounded-xl h-[4rem] w-[15rem] grid place-items-center bg-white z-20 font-dnf lg:hover:scale-105 transition-transform ease-in-out duration-500">
          <div className="flex flex-row justify-content-center gap-4">
            <img src="/image/coins.png" className="h-10 w-10" />
            <span className="self-center text-2xl">1,000 P</span>
          </div>
        </Link>
        <Link to="/" className="rounded-xl h-[4rem] w-[15rem] grid place-items-center bg-slate-500 z-20 font-dnf lg:hover:scale-105 transition-transform ease-in-out duration-500">
          <div className="flex flex-row justify-content-center gap-4">
            <span className="self-center text-2xl text-white">구매하기</span>
          </div>
        </Link>
      </div>
    </Card>
  );
}
