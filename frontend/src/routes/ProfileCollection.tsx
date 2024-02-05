import { useParams } from "react-router-dom";
import { Mobile, PC } from "@/components/MediaQuery";
import Collection from "@/components/profile/Collection";
import AddCollection from "@/components/profile/AddCollection";
import useProfileDogamsQuery from "@/apis/profile/dogam/queries/useProfileDogamsQuery";
import useMyDataQuery from "@/apis/user/queries/useMyDataQuery";
// 프로필 도감은 백에서 미완이라 안뜸

export default function ProfileCollection() {
  const params = useParams();

  const { userData } = useMyDataQuery();
  const userEmail = userData?.userEmail;
  const { profileDogams, isLoading, error } = useProfileDogamsQuery({
    userEmail,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.{error.message}</div>;

  return (
    <>
      <PC>
        <div className="w-[1000px] m-1 grid grid-cols-3 row-auto place-items-center">
          {profileDogams &&
            Array.isArray(profileDogams) &&
            profileDogams.map((dogam, idx) => {
              return <Collection dogam={dogam} key={idx} />;
            })}
        </div>
        {/* 자기 프로필이 아닐때만 도감 추가 가능하게 */}
        <div className="flex justify-center mb-2 fixed bottom-0 left-5">
          {params.id != userData.userId ? <AddCollection /> : null}
        </div>
      </PC>

      {/* ----------------------------------------------------- */}

      <Mobile>
        <div className="w-full my-10 grid grid-cols-1 row-auto place-items-center">
          {profileDogams &&
            Array.isArray(profileDogams) &&
            profileDogams.map((dogam, idx) => {
              return <Collection dogam={dogam} key={idx} />;
            })}
        </div>
        {/* 자기 프로필이 아닐때만 도감 추가 가능하게 */}
        <div className="flex justify-center mb-2 fixed bottom-1 right-20">
          {params.id != userData.userId ? <AddCollection /> : null}
        </div>
      </Mobile>
    </>
  );
}

// // 유저 임시 아이디
// const userId = "2";

// // 도감 갯수 임시 데이터
// const profileDogams = [
//   {
//     dogamImg: "asdfasdf",
//     dogamTitle: "냠냠",
//     createdAt: "2020-01-01 00:00:00",
//     dogamHateAmount: 100,
//     isHated: false,
//   },
//   {
//     dogamImg: "asdfasdf",
//     dogamTitle: "냠냠",
//     createdAt: "2020-01-01 00:00:00",
//     dogamHateAmount: 100,
//     isHated: false,
//   },
//   {
//     dogamImg: "asdfasdf",
//     dogamTitle: "냠냠",
//     createdAt: "2020-01-01 00:00:00",
//     dogamHateAmount: 100,
//     isHated: false,
//   },
// ];
