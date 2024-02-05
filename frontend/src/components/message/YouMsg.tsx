import { Mobile, PC } from "../MediaQuery";

interface dataProps {
  userId: string;
  name: string;
  msgUserProfile: string;
  img: any;
  content: string;
}

export default function YouMsg({ data }: { data: dataProps }) {
  // 상대방 채팅의 경우 상대방의 이름과 프사가 보여야 한다.
  return (
    <>
      <PC>
        <div className="flex">
          {/* 상대방 프사 */}
          <img
            src={data.msgUserProfile}
            className="h-[50px] w-[50px] rounded-full mx-2"
          />
          <div>
            {/* 상대방 이름 */}
            <p className="font-bold">{data.name}</p>
            <div>
              <div className="max-w-[80%] m-2 p-3 rounded-2xl self-end bg-blue-300 text-white font-bold text-xl text-wrap">
                {/* 이미지인지 텍스트 채팅인지 판별 */}
                {data.img ? <img src={data.img} /> : data.content}
              </div>
            </div>
          </div>
        </div>
      </PC>

      <Mobile>
        <></>
      </Mobile>
    </>
  );
}
