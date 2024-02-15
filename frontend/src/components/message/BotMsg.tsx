import TypeIt from "typeit-react";
// import { Mobile, PC } from "../MediaQuery";

interface dataProps {
  chatRoomId: number;
  userId: number;
  content: any;
  messageType: string;
  imgCode: any;
  createdAt: Date | string;
}

export default function BotMsg({ data }: { data: dataProps }) {
  return (
    <>
      <div className="w-[100%] mb-1 py-2 self-end  bg-gray-500 bg-opacity-70 drop-shadow-sm text-white text-md text-wrap dark:text-black text-center">
        {/* 이미지인지 텍스트 채팅인지 판별 */}
        <TypeIt
          options={{
            speed: 50,
            waitUntilVisible: true,
            cursor: false,
          }}
        >
          {" "}
          {data.imgCode !== null ? <img src={data.imgCode} /> : data.content}
        </TypeIt>
      </div>
    </>
  );
}
