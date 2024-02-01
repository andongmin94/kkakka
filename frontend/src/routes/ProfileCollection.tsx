import AddCollection from "@/components/profile/AddCollection";
import Collection from "@/components/profile/Collection";
import { useParams } from "react-router-dom";

import { Mobile, PC } from "@/components/MediaQuery";

// import { useProfileDogamStore } from "@/stores/ProfileStore";
// import { useEffect } from "react";

export default function ProfileCollection() {
  // const { fetchProfileDogams, profileDogams } = useProfileDogamStore();

  // useEffect(() => {
  //   fetchProfileDogams();
  // }, [fetchProfileDogams]);

  // 유저 임시 아이디
  const userId = "2";

  // 도감 갯수 임시 데이터
  const profileDogams = [
    {
      dogamImg: "asdfasdf",
      dogamTitle: "냠냠",
      createdAt: "2020-01-01 00:00:00",
      dogamHateAmount: 100,
      isHated: false,
    },
    {
      dogamImg: "asdfasdf",
      dogamTitle: "냠냠",
      createdAt: "2020-01-01 00:00:00",
      dogamHateAmount: 100,
      isHated: false,
    },
    {
      dogamImg: "asdfasdf",
      dogamTitle: "냠냠",
      createdAt: "2020-01-01 00:00:00",
      dogamHateAmount: 100,
      isHated: false,
    },
  ];

  const params = useParams();

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
          {params.id != userId ? <AddCollection /> : null}
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
          {params.id != userId ? <AddCollection /> : null}
        </div>
      </Mobile>
    </>
  );
}
