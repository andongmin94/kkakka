import { useState } from "react";
import { Link } from "react-router-dom";
import { Mobile, PC } from "../MediaQuery";
import NewDogamAlias from "./NewDogamAlias";
import ThumbsDown from "../profile/ThumbsDown";
import { NewDogamType } from "@/types/dogamTypes";

export default function NewDogam({ data }: { data: NewDogamType }) {
  const [dogamDislikeNum, setDogamDislikeNum] = useState(data.dogamDislikeNum);
  console.log(data);
  return (
    <>
      <PC>
        {/* 전체 */}
        <div className="flex flex-col justify-center items-center shadow-lg  bg-gray-300 rounded-md mr-8 mb-8 relative overflow-hidden ">
          <Link to={`/main/dogam/${data.dogamId}`}>
            <img src={data.dogamImgUrl} />
            {/* 오버레이 */}
            <div className="absolute bg-black top-0 left-0 bg-opacity-50 opacity-0 hover:opacity-100 rounded-md w-[100%] h-[100%]">
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col items-center mt-10 mb-5">
                  {/* 칭호 */}
                  <NewDogamAlias alias={data.friendAlias} />
                  {/* 이름 */}
                  <p className="font-bold text-md mt-2 text-white drop-shadow-md">
                    {data.friendName}
                  </p>
                </div>
                {/* 타이틀 */}
                <div className=" text-md mb-3 w-[50%] flex justify-center text-white drop-shadow-md">
                  {data.dogamTitle.length > 30
                    ? `${data.dogamTitle.substring(0, 30)}...`
                    : data.dogamTitle}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </PC>

      {/* ------------------------------------------------------------------- */}

      <Mobile>
        {/* 전체 */}
        <div className="w-[450px] flex">
          {/* 왼쪽 구역 */}
          <Link
            to={`/main/profile/${data.friendId}`}
            className="w-[200px] border-4 rounded-3xl rounded-r-none border-r-0 flex flex-col justify-center items-center bg-slate-100"
          >
            {/* 프사 */}
            <img
              src={data.friendImgUrl}
              className="w-[130px] h-[130px] mb-5 rounded-full"
              alt="프로필 이미지"
            />
            {/* 이름 */}
            <p className="font-bold text-xl mb-5">{data.friendName}</p>
            {/* 칭호 */}
            <NewDogamAlias alias={data.friendAlias} />
          </Link>

          {/* 오른쪽 구역 */}
          <Link to={`/main/dogam/${data.dogamId}`}>
            {/* 이미지 */}
            <div
              className="h-[200px] w-[270px] border-4 border-inherit rounded-3xl rounded-l-none border-l-0 rounded-b-none border-b-0"
              style={{
                backgroundImage: `url(${data.dogamImgUrl})`,
                backgroundSize: "cover",
              }}
            />
            <div className="w-[270px] border-4 border-inherit rounded-3xl bg-cover rounded-l-none rounded-t-none border-l-0 border-t-0 mt-0">
              {/* 제목 */}
              <div className="w-full font-bold text-xl px-2 py-3">
                {data.dogamTitle}
              </div>
              <div className="flex gap-3 pb-3 font-bold items-center">
                {/* 싫어요 */}
                <div className="lg:hover:scale-110 transition-transform ease-in-out duration-500">
                  <ThumbsDown
                    tD={data.hated}
                    dogamId={data.dogamId}
                    dogamDislikeNum={dogamDislikeNum}
                    setDogamDislikeNum={setDogamDislikeNum}
                  />
                </div>
                <div className="flex self-center mr-4 text-sm">
                  {dogamDislikeNum}
                </div>
                {/* 댓글 */}
                <Link to={`/main/dogam/${data.dogamId}`} className="text-xl">
                  💬
                </Link>
                {/* 등록일*/}
                {/* <div className="grid grid-col place-items-center font-bold text-[12px]">
                  <div className="text-center">{data.createdAt}</div>
                </div> */}
              </div>
            </div>
          </Link>
        </div>
      </Mobile>
    </>
  );
}
