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
        <div className="flex flex-col w-[350px] shadow-sm mb-2 bg-gray-200 rounded-md">
          {/* 왼쪽 구역 */}
          <Link
            to={`/main/profile/${data.friendId}`}
            className="w-[350px] h-[80px] flex p-4 shadow-sm items-center mb-3"
          >
            {/* 프사 */}
            <img
              src={data.friendImgUrl}
              className="w-[60px] h-[60px] rounded-full mr-3"
              alt="프로필 이미지"
            />
            <div className="flex items-center">
              {/* 이름 */}
              <p className="font-bold text-md mr-3">{data.friendName}</p>
              {/* 칭호 */}
              <NewDogamAlias alias={data.friendAlias} />
            </div>
          </Link>

          {/* 오른쪽 구역 */}
          <div className="flex flex-col ml-6 mt-1">
            {/* 제목 */}
            <Link
              to={`/main/dogam/${data.dogamId}`}
              className="w-full font-bold text-md mb-3"
            >
              {data.dogamTitle}
            </Link>
            {/* 이미지 */}
            <div
              className="h-[200px] w-[300px] rounded-md border-l-0 border-b-0 mb-3"
              style={{
                backgroundImage: `url(${data.dogamImgUrl})`,
                backgroundSize: "cover",
                backgroundColor: "white",
              }}
            />
            <div className="w-[320px] border-inherit rounded-3xl bg-cover rounded-l-none rounded-t-none border-l-0 border-t-0 mt-0">
              <div className="flex gap-3 pb-3 font-bold items-center">
                {/* 싫어요 */}
                <div className="lg:hover:scale-105 transition-transform ease-in-out duration-500">
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
              </div>
            </div>
          </div>
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
