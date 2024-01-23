import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function Speaker() {
  return (
    <Card className="static group/item bg-[url('/image/speakerBg.png')] border-solid border-4 rounded-3xl bg-cover h-[23rem] w-[23rem] lg:hover:scale-105 transition-transform ease-in-out duration-500">
      <div className="flex flex-col items-center">
        <img src="/image/speaker.png" className="h-20 w-20 pt-3" />
        <p className="text-4xl mt-3 font-bold text-white">확성기</p>
        <p className="text-xl mt-10 font-bold text-white mx-10">
          접속 중인 모든 유저의 화면에 원하는 멘트를 보여주는 아이템이다. 본인
          또는 친구의 닉네임으로 사용이 가능하다.
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
