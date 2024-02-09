import Poor from "@/components/profile/Poor";
import classes from "./ProfilePage.module.css";
import { Mobile, PC } from "@/components/MediaQuery";
import ProfileEdit from "@/components/profile/ProfileEdit";
import { Link, Outlet } from "react-router-dom";
import ProfileImage from "@/components/profile/ProfileImage";
import UserCurrentAlias from "@/components/UserCurrentAlias";
import useUserStore from "@/store/user/userStore";

export default function MyProfilePage() {
  const { userInfo } = useUserStore();

  return (
    <>
      <PC>
        <div className="w-full flex flex-col items-center">
          {/* 프로필 배경 */}
          <div className="border-8 rounded-2xl border-red-200">
            <div
              className={`border-4 w-[1000px] h-[350px] flex-col m-1 border-blue-200 bg-[url("/image/profileBg.png")] bg-cover rounded-2xl`}
            >
              <div className="flex justify-between m-1">
                <div className="m-1 w-[550px] h-[220px]">
                  <div className="m-1 w-[200px] h-[200px] grid place-items-center">
                    <ProfileImage userImg={userInfo.userProfileImg} />
                  </div>
                </div>
                <div className="m-1 w-[550px] h-[200px] flex justify-end">
                  <div className="pt-[12px] mr-2"></div>
                  {userInfo.bankruptcy ? <Poor /> : null}
                  <ProfileEdit />
                </div>
              </div>
              <div className="m-1 w-100% h-[100px] flex gap-[100px] items-center pl-[35px]">
                <div className="font-bold text-4xl">
                  <div className="bg-white text-black rounded-2xl border-4 border-red-300 w-[150px] h-[60px] grid grid-col place-items-center">
                    {userInfo.userName}
                  </div>
                </div>
                <div>
                  <UserCurrentAlias alias={userInfo.userAlias} />
                </div>
              </div>
            </div>
            <div className=" m-1 w-100% h-[50px] w-[1000px] flex gap-10">
              <div
                className={`${classes.menu} ${classes.SMN_effect} font-bold flex text-2xl items-center gap-14 pl-8`}
              >
                <Link
                  to={`/main/profile/${userInfo.userId}`}
                  className="h-[30px]"
                >
                  도감
                </Link>
                <Link to={`/main/profile/${userInfo.userId}/dishonor`}>
                  불명예 전당
                </Link>
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
          <div className="border-8 rounded-2xl w-full border-red-200 flex flex-col">
            <div
              className={`border-4 w-full h-[350px] flex-col border-blue-200 bg-[url("/image/profileBg.png")] bg-cover rounded-2xl`}
            >
              <div className="flex justify-between m-1">
                <div className="m-1 w-[550px] h-[220px]">
                  <div className="m-1 w-[150px] h-[150px] grid place-items-center">
                    <ProfileImage userImg={userInfo.userProfileImg} />
                  </div>
                </div>
                <div className="m-1 w-[550px] h-[200px] flex justify-end">
                  <div className="pt-[12px] mr-2"></div>
                  {userInfo.bankruptcy ? <Poor /> : null}
                  <ProfileEdit />
                </div>
              </div>
              <div className="m-1 w-100% h-[100px] flex gap-[100px] items-center pl-[5px] justify-between">
                <div className="font-bold text-4xl">
                  <div className="bg-white text-black rounded-2xl border-4 border-red-300 w-[150px] h-[60px] grid grid-col place-items-center ml-2">
                    {userInfo.userName}
                  </div>
                </div>
                <div className="mr-2">
                  <UserCurrentAlias alias={userInfo.userAlias} />
                </div>
              </div>
            </div>
            <div className="w-full h-[50px] flex justify-center">
              <div
                className={`${classes.menu} ${classes.SMN_effect} font-bold flex text-2xl`}
              >
                <div className="grid grid-cols-3 place-items-center gap-10">
                  <Link
                    to={`/main/profile/${userInfo.userId}`}
                    className="h-[30px]"
                  >
                    도감
                  </Link>
                  <Link to={`/main/profile/${userInfo.userId}/dishonor`}>
                    불명예 전당
                  </Link>
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
