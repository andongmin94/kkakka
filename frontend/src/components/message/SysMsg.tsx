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

export default function SysMsg({ data }: { data: dataProps }) {
  // const formattedTime =
  //   typeof data.createdAt === "string"
  //     ? new Date(data.createdAt).toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       })
  //     : new Date(data.createdAt).toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       });
  return (
    <>
      <div className="max-w-[70%] m-2 pt-2 pb-1 px-2 self-end  text-gray-600 text-sm text-wrap border-b-2 border-b-slate-400 dark:text-white">
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
