import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LiveChat() {
  const [inputChat, setInputChat] = useState("");

  return (
    <div className="border-2 border-black w-full h-[75vh] grid grid-cols-3">
      {/* 왼쪽 메인 채팅 */}
      <div className="border-2 border-red-200 h-full col-span-2 grid grid-rows-12">
        {/* 상단 프로필 */}
        <div className="border-2 border-black row-span-2 w-full"></div>
        {/* 채팅 바디 */}
        <div className="border-2 border-black row-span-9 w-full"></div>
        {/* 채팅 하단 */}
        <div className="border-2 border-black row-span-1 w-full grid grid-cols-12">
          <div className=" col-span-1 flex justify-center items-center">
            <button>
              <img
                src="/image/messagePicture.png"
                className="h-[30px] w-[30px]"
              />
            </button>
          </div>
          <div className=" col-span-1 flex justify-center items-center">
            <button>
              <img
                src="/image/messageDogam.png"
                className="h-[30px] w-[30px]"
              />
            </button>
          </div>
          <div className=" col-span-9 flex justify-center items-center">
            <Input
              type="text"
              className="w-full font-bold text-xl"
              onChange={(e) => {
                // 입력받은 정보를 상태관리
                setInputChat(e.target.value);
              }}
              value={inputChat}
            />
          </div>
          <div className=" col-span-1 flex justify-center items-center">
            {/* 채팅 입력 버튼 */}
            <button type="submit">
              <img src="/image/chatBtn.png" className="h-[30px] w-[30px]" />
            </button>
          </div>
          {/* ---------- */}
        </div>
      </div>
      {/* 오른쪽 배팅 and 챗봇 */}
      <div className="border-2 border-blue-200 h-full col-span-1 grid grid-row-10">
        <div className="border-2 border-black row-span-4 w-full flex justify-center items-center">
          {/* 승부예측 결과 */}
          <div className=" bg-slate-100 w-[95%] h-[95%] rounded-md border-2 flex justify-center item-center">
            승부예측 결과
          </div>
        </div>
        <div className="border-2 border-black row-span-6 w-full flex justify-center items-center">
          {/* 챗봇 */}
          <div className=" bg-slate-100 w-[95%] h-[95%] rounded-md border-2 grid grid-rows-6">
            <div className="w-full row-span-1 bg-slate-200 flex justify-center items-center">
              챗봇
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
