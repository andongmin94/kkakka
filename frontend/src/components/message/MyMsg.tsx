// import { Mobile, PC } from "../MediaQuery";

interface dataProps {
  chatRoomId: number;
  userId: number;
  content: any;
  messageType: string;
  imgCode: any;
  createdAt: Date | string;
  // userId: string;
  // name: string;
  // msgUserProfile: string;
  // img: any; // 아무리 해도 해결이 안돼서 일단 any
  // content: string;
}

// chatRoomId: num;

export default function MyMsg({ data }: { data: dataProps }) {
  // console.log("myMsg");
  // console.log(data);
  const formattedTime =
    typeof data.createdAt === "string"
      ? new Date(data.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : new Date(data.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
  return (
    <>
      <div className=" self-end text-xs flex mb-2">{formattedTime}</div>
      <div className="max-w-[70%] m-2 mr-3 py-3 px-4 rounded-sm self-end shadow-md bg-orange-200 font-bold text-sm text-wrap dark:text-black">
        {/* 이미지인지 텍스트 채팅인지 판별 */}
        {data.imgCode !== null ? <img src={data.imgCode} /> : data.content}
      </div>
    </>
  );
}
