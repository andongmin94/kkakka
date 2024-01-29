import Collection from "@/components/profile/Collection";
// import { useProfileDogamStore } from "@/stores/ProfileStore";
// import { useEffect } from "react";

export default function ProfileCollection() {
  // const { fetchProfileDogams, profileDogams } = useProfileDogamStore();

  // useEffect(() => {
  //   fetchProfileDogams();
  // }, [fetchProfileDogams]);

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

  return (
    <div className="w-[1000px] m-1 grid grid-cols-3 row-auto place-items-center">
      {profileDogams &&
        Array.isArray(profileDogams) &&
        profileDogams.map((dogam, idx) => {
          return <Collection dogam={dogam} key={idx} />;
        })}
    </div>
  );
}
