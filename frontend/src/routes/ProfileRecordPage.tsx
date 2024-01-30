import Record from "@/components/profile/Record";

export default function ProfileRecordPage() {
  // 어떤 데이터 형식인지 몰라서 일단 임시로..
  const recordArr = [
    {
      win: true,
      map: "칼바람나락",
      time: "1월1일 16:02",
      kill: 6,
      death: 5,
      assist: 10,
      score: 3.1,
      event: "쿼드라킬",
      killRate: 73,
      cs: 123,
      csPerM: 3.7,
      itemArr: [
        "/image/lolItem.png",
        "/image/lolItem.png",
        "/image/lolItem.png",
        "/image/lolItem.png",
      ],
      blueTeam: [
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
      ],
      redTeam: [
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
      ],
    },
    {
      win: false,
      map: "칼바람나락",
      time: "1월1일 16:02",
      kill: 6,
      death: 5,
      assist: 10,
      score: 3.1,
      event: "쿼드라킬",
      killRate: 73,
      cs: 123,
      csPerM: 3.7,
      itemArr: [
        "/image/lolItem.png",
        "/image/lolItem.png",
        "/image/lolItem.png",
        "/image/lolItem.png",
      ],
      blueTeam: [
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
      ],
      redTeam: [
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
        { name: "user1", champion: "/image/lolCham.png" },
      ],
    },
  ];

  return (
    <>
      {recordArr.map((record, idx) => {
        return <Record record={record} key={idx} />;
      })}
    </>
  );
}
