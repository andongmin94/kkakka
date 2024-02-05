import { Mobile, PC } from "../MediaQuery";

interface dataProps {
  userId: string;
  name: string;
  msgUserProfile: string;
  img: any; // 아무리 해도 해결이 안돼서 일단 any
  content: string;
}

export default function MyMsg({ data }: { data: dataProps }) {
  return (
    <>
      <PC>
        <div className="max-w-[70%] m-2 p-3 rounded-2xl self-end bg-orange-300 text-white font-bold text-xl text-wrap">
          {/* 이미지인지 텍스트 채팅인지 판별 */}
          {data.img ? <img src={data.img} /> : data.content}
        </div>
      </PC>
      <Mobile>
        <></>
      </Mobile>
    </>
  );
}
