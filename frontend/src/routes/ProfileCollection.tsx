import Collection from "@/components/profile/Collection";

export default function ProfileCollection() {
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
      {data.map((_, idx) => {
        return <Collection key={idx} />;
      })}
    </div>
  );
}
