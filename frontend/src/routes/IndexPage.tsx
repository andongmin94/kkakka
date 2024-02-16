import NewDogamList from "@/components/main/NewDogamList";
import { Mobile, PC } from "@/components/MediaQuery";
import LiveContentCarousel from "@/components/main/LiveContentCarousel";
import useUserStore from "@/store/user/userStore";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const { userInfo } = useUserStore();

  return (
    <>
      {!userInfo ? (
        <div>로딩 중 </div>
      ) : (
        <PC>
          <div>
            <div className="text-lg flex">
              <p className="grid font-bold ml-10">라이브</p>
            </div>
            <div className="h-[100px] items-center">
              <LiveContentCarousel />
            </div>
            <div className="text-lg mt-[300px] mb-5 flex ">
              <p className="grid ml-10 font-bold">새로 올라온 도감</p>
            </div>
            <div className="mb-5 ml-10">
              {/* 도감 리스트 */}
              <NewDogamList />
            </div>
          </div>
        </PC>
      )}

      {/* ------------------------------------------------------------------------------------------------ */}

      <Mobile>
        <div>
          {/* 로고 이미지 */}
          <Link to="/main" className="mt-10 mb-10 w-3/5 p-2 text-center">
            <img
              alt="logo"
              src="/image/logo.png"
              className="h-[80px] mx-auto"
            />
          </Link>
          <div className="text-xl mt-5 mb-0 flex">
            <p className="grid place-items-center ml-2 font-bold">라이브</p>
          </div>
          <div className="h-[100px] flex flex-col items-center">
            <LiveContentCarousel />
          </div>
          <div className="text-xl mt-[320px] mb-10 flex ">
            <p className="grid place-items-center ml-2 font-bold">
              새로 올라온 도감
            </p>
          </div>
          <div className="grid grid-cols-1 place-items-center gap-y-5 mb-5 w-full">
            {/* 도감 리스트 */}
            <div>친구가 없어요 !</div>
          </div>
        </div>
      </Mobile>
    </>
  );
}
