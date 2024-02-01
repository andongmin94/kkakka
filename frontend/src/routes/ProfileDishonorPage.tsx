import Dishonor from "@/components/profile/Dishonor";
import { useLocation } from "react-router-dom";

export default function ProfileDishonorPage() {
  const location = useLocation();
  const aliases = location.state.aliases;

  // 칭호 갯수 임시 데이터
  const profileAlias = [
    {
      alias: "인의동 손잭스",
      name: "이해건",
      createdAt: "2024년 1월 1일",
    },
    {
      alias: "천재 개발자",
      name: "김상훈",
      createdAt: "2024년 1월 2일",
    },
    {
      alias: "말파나 하십쇼",
      name: "오세영",
      createdAt: "2024년 1월 3일",
    },
  ];

  return (
    <div className="w-[1000px] m-1 grid grid-cols-3 row-auto place-items-center">
      {aliases.map((data, idx) => {
        return <Dishonor data={data} key={idx} />;
      })}
    </div>
  );
}
