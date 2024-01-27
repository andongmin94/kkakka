import Collection from "@/components/profile/Collection";
import { useProfileDogamStore } from "@/stores/ProfileStore";
import { useEffect } from "react";

export default function ProfileCollection() {
  const { fetchProfileDogams, profileDogams } = useProfileStore();

  useEffect(() => {
    fetchProfileDogams();
  }, [fetchProfileDogams]);

  // 들어오는 데이터 예시
  // [
  //   {
  //     "dogamImg": "asdfasdf",
  //     "dogamTitle": "냠냠",
  //     "createdAt": "2020-01-01 00:00:00",
  //     "dogamHateAmount": 100,
  //     "isHated": false
  //   },
  //   {
  //     "dogamImg": "asdfasdf",
  //     "dogamTitle": "냠냠",
  //     "createdAt": "2020-01-01 00:00:00",
  //     "dogamHateAmount": 100,
  //     "isHated": false
  //   }
  // ]

  // 도감 갯수 임시 데이터
  const data = [
    {
      title: "삽질하는 이수민머리ㅋㅋ",
      bg: "/image/liveImage.png",
      thumbsDown: false,
      update: "2024.01.25",
    },
    {
      title: "삽질하는 삼수민머리ㅋㅋ",
      bg: "/image/liveImage.png",
      thumbsDown: false,
      update: "2024.01.25",
    },
    {
      title: "삽질하는 사수민머리ㅋㅋ",
      bg: "/image/liveImage.png",
      thumbsDown: false,
      update: "2024.01.25",
    },
    {
      title: "삽질하는 오수민머리ㅋㅋ",
      bg: "/image/liveImage.png",
      thumbsDown: false,
      update: "2024.01.25",
    },
  ];

  return (
    <div className="border-2 w-[1000px] m-1 grid grid-cols-3 row-auto place-items-center">
      {profileDogams &&
        profileDogams.map((dogam, idx) => {
          return (
            <Collection
              key={idx}
              bg={dogam.dogamImg}
              title={dogam.dogamTitle}
              update={dogam.createdAt}
              thumbsDown={dogam.isHated}
              dogamHateAmount={dogam.dogamHateAmount}
            />
          );
        })}
    </div>
  );
}
