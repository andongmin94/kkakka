import { Link } from "react-router-dom";
import CommentModal from "../profile/CommentModal";
import ThumbsDown from "../profile/ThumbsDown";
import NewDogamAlias from "./NewDogamAlias";

import { Mobile, PC } from "../MediaQuery";

interface dataProps {
  // 도감 주인 아이디
  id: string;
  // 도감 주인 프사
  userImg: string;
  //   도감 사진
  dogamImg: string;
  // 도감 주인 이름
  name: string;
  // 도감 주인 칭호
  alias: string;
  //   도감 정보
  dogamTitle: string;
  createdAt: string;
  dogamHateAmount: number;
  isHated: boolean;
}

export default function NewDogam({ data }: { data: dataProps }) {
  return (
    <>
      <PC>
        {/* 전체 */}
        <div className="w-[500px] flex">
          {/* 왼쪽 구역 */}
          <Link
            to={`/main/profile/${data.id}`}
            className="w-[200px] border-4 rounded-3xl rounded-r-none border-r-0 flex flex-col justify-center items-center bg-slate-100"
          >
            {/* 프사 */}
            <img
              src={data.userImg}
              className="w-[130px] h-[130px] mb-5 rounded-full"
            />
            {/* 이름 */}
            <p className="font-bold text-2xl mb-5">{data.name}</p>
            {/* 칭호 */}
            <NewDogamAlias alias={data.alias} />
          </Link>

          {/* 오른쪽 구역 */}
          <div>
            {/* 이미지 일단은 정적으로 들어감 */}
            <div
              className={`h-[200px] w-[320px] border-4 border-inherit rounded-3xl rounded-l-none border-l-0 bg-[url('${data.dogamImg}')] bg-cover rounded-b-none border-b-0`}
            />
            <div className="w-[320px] border-4 border-inherit rounded-3xl bg-cover rounded-l-none rounded-t-none border-l-0 border-t-0 mt-0">
              {/* 제목 */}
              <div className="w-full font-bold text-2xl px-2 py-3">
                {data.dogamTitle}
              </div>
              <div className="flex gap-3 pb-3 font-bold items-center">
                {/* 싫어요 */}
                <div className="lg:hover:scale-110 transition-transform ease-in-out duration-500">
                  <ThumbsDown tD={data.isHated} />
                </div>
                <div className=" flex self-center mr-4 text-xl text-blue-600">
                  {data.dogamHateAmount}
                </div>
                {/* 댓글 */}
                <div className="lg:hover:scale-110 transition-transform ease-in-out duration-500">
                  <CommentModal />
                </div>
                {/* 등록일 */}
                <div className="grid grid-col place-items-center font-bold">
                  <div className="text-center">{data.createdAt}</div>
                </div>
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
            to={`/main/profile/${data.id}`}
            className="w-[200px] border-4 rounded-3xl rounded-r-none border-r-0 flex flex-col justify-center items-center bg-slate-100"
          >
            {/* 프사 */}
            <img
              src={data.userImg}
              className="w-[130px] h-[130px] mb-5 rounded-full"
            />
            {/* 이름 */}
            <p className="font-bold text-2xl mb-5">{data.name}</p>
            {/* 칭호 */}
            <NewDogamAlias alias={data.alias} />
          </Link>

          {/* 오른쪽 구역 */}
          <div>
            {/* 이미지 일단은 정적으로 들어감 */}
            <div
              className={`h-[200px] w-[270px] border-4 border-inherit rounded-3xl rounded-l-none border-l-0 bg-[url('${data.dogamImg}')] bg-cover rounded-b-none border-b-0`}
            />
            <div className="w-[270px] border-4 border-inherit rounded-3xl bg-cover rounded-l-none rounded-t-none border-l-0 border-t-0 mt-0">
              {/* 제목 */}
              <div className="w-full font-bold text-2xl px-2 py-3">
                {data.dogamTitle}
              </div>
              <div className="flex gap-3 pb-3 font-bold items-center">
                {/* 싫어요 */}
                <div className="lg:hover:scale-110 transition-transform ease-in-out duration-500">
                  <ThumbsDown tD={data.isHated} />
                </div>
                <div className=" flex self-center mr-4 text-xl text-blue-600">
                  {data.dogamHateAmount}
                </div>
                {/* 댓글 */}
                <div className="lg:hover:scale-110 transition-transform ease-in-out duration-500">
                  <CommentModal />
                </div>
                {/* 등록일 */}
                <div className="grid grid-col place-items-center font-bold text-[12px]">
                  <div className="text-center">{data.createdAt}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Mobile>
    </>
  );
}
