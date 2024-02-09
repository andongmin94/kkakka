import Poor from "@/components/profile/Poor";
// import Check from "@/components/profile/Check";
import classes from "./ProfilePage.module.css";
import { Button } from "@/components/ui/button";
import { Mobile, PC } from "@/components/MediaQuery";
import { Link, Outlet, useParams } from "react-router-dom";
import ProfileImage from "@/components/profile/ProfileImage";
import UserCurrentAlias from "@/components/UserCurrentAlias";
import { useEffect } from "react";
import useProfileStore from "@/store/profile/profileStore";
import useFriendshipStore from "@/store/profile/friendshipStore";
import { useProfile } from "@/hooks/profile/queries/useUserProfileQuery";
import { useFriendship } from "@/hooks/profile/queries/useFriendshipQuery";
import { useEnterDmPost } from "@/hooks/dm/mutations/useEnterDmPost";
import { useFriendshipChangePost } from "@/hooks/profile/mutations/useFriendshipChangePost";

export default function ProfilePage() {
  const params = useParams();

  const { profileInfo, setProfileInfo } = useProfileStore();
  const { friendship, setFriendship } = useFriendshipStore();

  const { useUserProfileQuery } = useProfile();
  const { data: userProfileData } = useUserProfileQuery(params.id!);

  const { useFriendshipQuery } = useFriendship();
  const { data: friendshipData } = useFriendshipQuery(params.id!);

  useEffect(() => {
    if (userProfileData) {
      setProfileInfo(userProfileData);
      console.log("프로필 유저 정보", userProfileData);
    } else {
      console.log("프로필 유저 정보 없음");
    }
  }, [userProfileData, setProfileInfo]);
  const enterDmMutation = useEnterDmPost();
  const { mutate: dmMutate } = enterDmMutation;

  const enterChatHandler = () => {
    dmMutate(params.id!);
  };

  useEffect(() => {
    if (friendshipData) {
      setFriendship(friendshipData);
      console.log("프로필 유저와 친구관계", friendshipData);
    } else {
      console.log("프로필 유저와 친구관계 없음");
    }
  }, [friendship, setFriendship]);

  const friendshipChangeMutation = useFriendshipChangePost();
  const { mutate: friendshipChangeMutate } = friendshipChangeMutation;

  const changeFriendStatusHandler = () => {
    friendshipChangeMutate(params.id!);
  };

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
                    <ProfileImage userImg={profileInfo.userProfileImg} />
                  </div>
                </div>
                <div className="m-1 w-[550px] h-[200px] flex justify-end">
                  <div className="pt-[12px] mr-2">
                    {/* <Check check={check} /> */}
                  </div>
                  {profileInfo.bankruptcy ? <Poor /> : null}
                  <div>
                    <Button
                      type="submit"
                      variant="secondary"
                      className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px]"
                      onClick={() => {
                        enterChatHandler();
                      }}
                    >
                      메세지
                    </Button>
                    {(friendship === "FRIEND" && (
                      <Button onClick={changeFriendStatusHandler}>
                        친구끊기
                      </Button>
                    )) ||
                      (friendship === "RECEIVE" && (
                        <Button onClick={changeFriendStatusHandler}>
                          수락
                        </Button>
                      )) ||
                      (friendship === "SEND" && (
                        <Button onClick={changeFriendStatusHandler}>
                          요청취소
                        </Button>
                      )) ||
                      (friendship === "NONE" && (
                        <Button onClick={changeFriendStatusHandler}>
                          친구신청
                        </Button>
                      ))}
                  </div>
                </div>
              </div>
              <div className="m-1 w-100% h-[100px] flex gap-[100px] items-center pl-[35px]">
                <div className="font-bold text-4xl">
                  <div className="bg-white text-black rounded-2xl border-4 border-red-300 w-[150px] h-[60px] grid grid-col place-items-center">
                    {profileInfo.userName}
                  </div>
                </div>
                <div>
                  <UserCurrentAlias alias={profileInfo.userAlias} />
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
                    <ProfileImage userImg={profileInfo.userProfileImg} />
                  </div>
                </div>
                <div className="m-1 w-[550px] h-[200px] flex justify-end">
                  <div className="pt-[12px] mr-2">
                    {/* <Check check={check} /> */}
                  </div>
                  {profileInfo.bankruptcy ? <Poor /> : null}
                  <div>
                    <Button
                      type="submit"
                      variant="secondary"
                      className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px]"
                    >
                      메세지
                    </Button>
                    {(friendship === "FRIEND" && (
                      <Button onClick={changeFriendStatusHandler}>
                        친구끊기
                      </Button>
                    )) ||
                      (friendship === "RECEIVE" && (
                        <Button onClick={changeFriendStatusHandler}>
                          수락
                        </Button>
                      )) ||
                      (friendship === "SEND" && (
                        <Button onClick={changeFriendStatusHandler}>
                          요청취소
                        </Button>
                      )) ||
                      (friendship === "NONE" && (
                        <Button onClick={changeFriendStatusHandler}>
                          친구신청
                        </Button>
                      ))}
                  </div>
                </div>
              </div>
              <div className="m-1 w-100% h-[100px] flex gap-[100px] items-center pl-[5px] justify-between">
                <div className="font-bold text-4xl">
                  <div className="bg-white text-black rounded-2xl border-4 border-red-300 w-[150px] h-[60px] grid grid-col place-items-center ml-2">
                    {profileInfo.userName}
                  </div>
                </div>
                <div className="mr-2">
                  <UserCurrentAlias alias={profileInfo.userAlias} />
                </div>
              </div>
            </div>
            <div className="w-full h-[50px] flex justify-center">
              <div
                className={`${classes.menu} ${classes.SMN_effect} font-bold flex text-2xl`}
              >
                <div className="grid grid-cols-3 place-items-center gap-10">
                  <Link
                    to={`/main/profile/${profileInfo.userId}`}
                    className="h-[30px]"
                  >
                    도감
                  </Link>
                  <Link to={`/main/profile/${profileInfo.userId}/dishonor`}>
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
