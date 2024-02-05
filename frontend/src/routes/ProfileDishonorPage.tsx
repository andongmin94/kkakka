import { Mobile, PC } from "@/components/MediaQuery";
import Dishonor from "@/components/profile/Dishonor";
import useAliasListQuery from "@/apis/profile/alias/queries/useAliasListQuery";
import useMyDataQuery from "@/apis/user/queries/useMyDataQuery";

export default function ProfileDishonorPage() {
  const { userData } = useMyDataQuery();
  const userEmail = userData.userEmail;
  console.log(userEmail);

  const { aliases, isLoading, error } = useAliasListQuery({ userEmail });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.{error.message}</div>;

  return (
    <>
      <PC>
        <div className="w-[1000px] m-1 grid grid-cols-3 row-auto place-items-center">
          {aliases &&
            aliases.map((data, idx) => {
              return <Dishonor data={data} key={idx} />;
            })}
        </div>
      </PC>

      {/* ------------------------------------------------ */}

      <Mobile>
        <div className="w-full m-1 grid grid-cols-2 row-auto place-items-center">
          {aliases &&
            aliases.map((data, idx) => {
              return <Dishonor data={data} key={idx} />;
            })}
        </div>
      </Mobile>
    </>
  );
}

// 칭호 갯수 임시 데이터
// const profileAlias = [
//   {
//     alias: "인의동 손잭스",
//     name: "이해건",
//     createdAt: "2024년 1월 1일",
//   },
//   {
//     alias: "천재 개발자",
//     name: "김상훈",
//     createdAt: "2024년 1월 2일",
//   },
//   {
//     alias: "말파나 하십쇼",
//     name: "오세영",
//     createdAt: "2024년 1월 3일",
//   },
// ];
