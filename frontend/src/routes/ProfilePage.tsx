import { Link, Outlet, useParams } from "react-router-dom";
import classes from "./ProfilePage.module.css";

import Poor from "@/components/profile/Poor";
import ProfileEdit from "@/components/profile/ProfileEdit";
import ProfileImage from "@/components/profile/ProfileImage";
import UserCurrentAlias from "@/components/UserCurrentAlias";
import Check from "@/components/profile/Check";

import { Button } from "@/components/ui/button";

import { Mobile, PC } from "@/components/MediaQuery";

import { useAliasStore } from "@/stores/ProfileStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function ProfilePage({ userEmail }: { userEmail: string }) {
  // 사용자 아이디 더미 데이터
  const userId = "1";
  // 사용자 이름
  const userName = "이수민";
  // 사용자 프사
  const userImg = "/image/joinSample.png";
  // 사용자 프로필 배경
  // const profileBg = "/image/profileBg.png";
  // 파산 플래그
  const poorFlag = true;
  // 칭호 내용
  const alias = "생태계파괴자";
  // 체크 버튼 플래그
  const check = false;

  const params = useParams();

  // 불명예전당
  const { aliases, fetchAliases } = useAliasStore(
    useShallow((state) => ({
      aliases: state.aliases,
      fetchAliases: state.fetchAliases,
    }))
  );

  useEffect(() => {
    fetchAliases(userEmail);
  }, [fetchAliases]);

  return (
    <>
      <PC>
        <div className="w-full flex flex-col items-center">
          {/* 프로필 배경 */}
          {/* 동적으로 주면 자꾸 됐다가 안됐다가 해서 일단 직접 입력으로 넣음 */}
          <div className="border-8 rounded-2xl border-red-200">
            <div
              className={`border-4 w-[1000px] h-[350px] flex-col m-1 border-blue-200 bg-[url("/image/profileBg.png")] bg-cover rounded-2xl`}
            >
              <div className="flex justify-between m-1">
                <div className="m-1 w-[550px] h-[220px]">
                  <div className="m-1 w-[200px] h-[200px] grid place-items-center">
                    {/* 프사 */}
                    <ProfileImage userImg={userImg} />
                  </div>
                </div>
                <div className="m-1 w-[550px] h-[200px] flex justify-end">
                  <div className="pt-[12px] mr-2">
                    {/* 뭔지 정확하게 몰라서 일단 체크 버튼 만들었음 */}
                    <Check check={check} />
                  </div>
                  {/* 파산 이미지 */}
                  {/* 파산일때만 보이게 */}
                  {poorFlag ? <Poor /> : null}

                  {/* 프로필 편집 or 메세지 버튼 */}
                  {/* 자신의 프로필이면 프로필 편집 버튼이 나타나게 */}
                  {/* 친구의 프로필이면 메세지 버튼이 나타나게 */}
                  {params.id === userId ? (
                    <ProfileEdit />
                  ) : (
                    <Button
                      type="submit"
                      variant="secondary"
                      className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px]"
                    >
                      메세지
                    </Button>
                  )}
                </div>
              </div>
              <div className="m-1 w-100% h-[100px] flex gap-[100px] items-center pl-[35px]">
                <div className="font-bold text-4xl">
                  <div className="bg-white text-black rounded-2xl border-4 border-red-300 w-[150px] h-[60px] grid grid-col place-items-center">
                    {userName}
                  </div>
                </div>
                <div>
                  <UserCurrentAlias alias={alias} />
                </div>
              </div>
            </div>
            <div className=" m-1 w-100% h-[50px] w-[1000px] flex gap-10">
              <div
                className={`${classes.menu} ${classes.SMN_effect} font-bold flex text-2xl items-center gap-14 pl-8`}
              >
                <Link to={`/main/profile/${params.id}`} className="h-[30px]">
                  도감
                </Link>
                <Link to={`/main/profile/${params.id}/dishonor`}>
                  불명예 전당
                </Link>
                <Link to={`/main/profile/${params.id}/record`}>전적</Link>
              </div>
            </div>

            <Outlet />
          </div>
        </div>
      </PC>

      {/* --------------------------------------------------------------------------------------------- */}

      <Mobile>
        <div className="w-full flex flex-col items-center">
          {/* 프로필 배경 */}
          {/* 동적으로 주면 자꾸 됐다가 안됐다가 해서 일단 직접 입력으로 넣음 */}
          <div className="border-8 rounded-2xl w-full border-red-200 flex flex-col">
            <div
              className={`border-4 w-full h-[350px] flex-col border-blue-200 bg-[url("/image/profileBg.png")] bg-cover rounded-2xl`}
            >
              <div className="flex justify-between m-1">
                <div className="m-1 w-[550px] h-[220px]">
                  <div className="m-1 w-[150px] h-[150px] grid place-items-center">
                    {/* 프사 */}
                    <ProfileImage userImg={userImg} />
                  </div>
                </div>
                <div className="m-1 w-[550px] h-[200px] flex justify-end">
                  <div className="pt-[12px] mr-2">
                    {/* 뭔지 정확하게 몰라서 일단 체크 버튼 만들었음 */}
                    <Check check={check} />
                  </div>
                  {/* 파산 이미지 */}
                  {/* 파산일때만 보이게 */}
                  {poorFlag ? <Poor /> : null}

                  {/* 프로필 편집 or 메세지 버튼 */}
                  {/* 자신의 프로필이면 프로필 편집 버튼이 나타나게 */}
                  {/* 친구의 프로필이면 메세지 버튼이 나타나게 */}
                  {params.id === userId ? (
                    <ProfileEdit />
                  ) : (
                    <Button
                      type="submit"
                      variant="secondary"
                      className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px]"
                    >
                      메세지
                    </Button>
                  )}
                </div>
              </div>
              <div className="m-1 w-100% h-[100px] flex gap-[100px] items-center pl-[5px] justify-between">
                <div className="font-bold text-4xl">
                  <div className="bg-white text-black rounded-2xl border-4 border-red-300 w-[150px] h-[60px] grid grid-col place-items-center ml-2">
                    {userName}
                  </div>
                </div>
                <div className="mr-2">
                  <UserCurrentAlias alias={alias} />
                </div>
              </div>
            </div>
            <div className="w-full h-[50px] flex justify-center">
              <div
                className={`${classes.menu} ${classes.SMN_effect} font-bold flex text-2xl`}
              >
                <div className="grid grid-cols-3 place-items-center gap-10">
                  <Link to={`/main/profile/${params.id}`} className="h-[30px]">
                    도감
                  </Link>
                  <Link to={`/main/profile/${params.id}/dishonor`}>
                    불명예 전당
                  </Link>
                  <Link to={`/main/profile/${params.id}/record`}>전적</Link>
                </div>
              </div>
            </div>

            <Outlet />
          </div>
        </div>
      </Mobile>
    </>
  );
}
