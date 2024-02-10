// import { Mobile, PC } from "../MediaQuery";

interface dataProps {
  chatRoomId: number;
  userId: number;
  content: any;
  messageType: string;
  imgCode: any;
  createdAt: Date | string;
  userName: string;
  userCurAlias: string;
  userProfileImg: string;
}

export default function YouMsg({ data }: { data: dataProps }) {
  // 상대방 채팅의 경우 상대방의 이름과 프사가 보여야 한다.
  const formattedTime = new Date(data.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log("youMsg");
  console.log(data);
  return (
    <>
      <div className="flex">
        {/* 상대방 프사 */}
        <img
          src={data.userProfileImg}
          className="h-[50px] w-[50px] rounded-full mx-2"
        />
        <div>
          {/* 상대방 이름 */}
          <p className="font-bold">
            {data.userCurAlias} {data.userName}
          </p>
          <div className="flex">
            <div className="max-w-[80%] m-2 p-3 rounded-2xl self-end bg-slate-200 font-bold text-xl text-wrap">
              {/* 이미지인지 텍스트 채팅인지 판별 */}
              {data.imgCode !== null ? (
                <img src={data.imgCode} />
              ) : (
                data.content
              )}
            </div>
            <div className=" self-end">{formattedTime}</div>
          </div>
        </div>
      </div>
    </>
  );
}
