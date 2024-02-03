import NewDogam from "@/components/main/NewDogam";
import { Mobile, PC } from "@/components/MediaQuery";
import LiveContentCarousel from "@/components/main/LiveContentCarousel";
import useBroadcastListQuery from "@/apis/broadcast/queries/useBroadcastListQuery";

// 임시 배열
const dataList = [
  {
    // 도감 주인 아이디
    id: "1",
    // 도감 주인 프사
    userImg: "/image/profileImage.png",
    //   도감 사진
    dogamImg: "/image/liveImage.png",
    // 도감 주인 이름
    name: "김상훈",
    // 도감 주인 칭호
    alias: "천재개발자",
    //   도감 정보
    dogamTitle: "냠냠",
    createdAt: "2020-01-01 00:00:00",
    dogamHateAmount: 100,
    isHated: false,
  },
  {
    // 도감 주인 아이디
    id: "1",
    // 도감 주인 프사
    userImg: "/image/profileImage.png",
    //   도감 사진
    dogamImg: "/image/liveImage.png",
    // 도감 주인 이름
    name: "김상훈",
    // 도감 주인 칭호
    alias: "천재개발자",
    //   도감 정보
    dogamTitle: "냠냠",
    createdAt: "2020-01-01 00:00:00",
    dogamHateAmount: 100,
    isHated: false,
  },
  {
    // 도감 주인 아이디
    id: "1",
    // 도감 주인 프사
    userImg: "/image/profileImage.png",
    //   도감 사진
    dogamImg: "/image/liveImage.png",
    // 도감 주인 이름
    name: "김상훈",
    // 도감 주인 칭호
    alias: "천재개발자",
    //   도감 정보
    dogamTitle: "냠냠",
    createdAt: "2020-01-01 00:00:00",
    dogamHateAmount: 100,
    isHated: false,
  },
];

export default function IndexPage() {
  const { broadcasts, isLoading, error } = useBroadcastListQuery();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.{error.message}</div>;

  return (
    <>
      <PC>
        <div>
          <div className="text-3xl mb-0 flex">
            <img src="/image/playing.png" className="h-[50px] w-[50px]" />
            <p className="grid place-items-center ml-2 font-bold">라이브</p>
          </div>
          <div className="h-[100px] w-[1200px] flex flex-col items-center">
            {broadcasts ? (
              <LiveContentCarousel broadcasts={broadcasts} />
            ) : (
              <div>Loading broadcasts...</div>
            )}
          </div>
          <div className="text-3xl mt-[300px] mb-10 flex ">
            <img src="/image/dogam.png" className="h-[50px] w-[50px]" />
            <p className="grid place-items-center ml-2 font-bold">
              새로 올라온 도감
            </p>
          </div>
          <div className="grid grid-cols-2 place-items-center gap-y-5 mb-5 w-[1050px]">
            {/* 도감 리스트 */}
            {dataList.map((data, idx) => {
              return <NewDogam data={data} key={idx} />;
            })}
          </div>
        </div>
      </PC>

      {/* ------------------------------------------------------------------------------------------------ */}

      <Mobile>
        <div>
          <div className="text-3xl mb-0 flex">
            <img src="/image/playing.png" className="h-[50px] w-[50px]" />
            <p className="grid place-items-center ml-2 font-bold">라이브</p>
          </div>
          <div className="h-[100px] w-[1200px] flex flex-col items-center">
            {/* <LiveContentCarousel /> */}
          </div>
          <div className="text-3xl mt-[300px] mb-10 flex ">
            <img src="/image/dogam.png" className="h-[50px] w-[50px]" />
            <p className="grid place-items-center ml-2 font-bold">
              새로 올라온 도감
            </p>
          </div>
          <div className="grid grid-cols-1 place-items-center gap-y-5 mb-5 w-full">
            {/* 도감 리스트 */}
            {dataList.map((data, idx) => {
              return <NewDogam data={data} key={idx} />;
            })}
          </div>
        </div>
      </Mobile>
    </>
  );
}
