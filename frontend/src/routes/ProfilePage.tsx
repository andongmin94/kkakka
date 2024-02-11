import Poor from "@/components/profile/Poor";
// import Check from "@/components/profile/Check";
import classes from "./ProfilePage.module.css";
import { Button } from "@/components/ui/button";
import { Mobile, PC } from "@/components/MediaQuery";
import { Link, Outlet, useParams } from "react-router-dom";
import ProfileImage from "@/components/profile/ProfileImage";
import UserCurrentAlias from "@/components/UserCurrentAlias";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "@/types/userTypes";

export default function ProfilePage() {
  const params = useParams();
  const userId = params.id;
  const token = localStorage.getItem("token");
  const [profileInfo, setProfileInfo] = useState<UserType>();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/data/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setProfileInfo(res.data.data);
      })
      .catch((err) => {
        console.error("프로필정보가져오기실패", err);
      });
  }, []);

  const [friendship, setFriendship] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/friends/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setFriendship(res.data.data.state);
      });
  }, []);

  const enterChatHandler = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/dm/enter/${userId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res: any) => {
        console.log("채팅방 입장성공", res);
      });
  };

  const changeFriendStatusHandler = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/${userId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res: any) => {
        console.log("친구상태변경성공", res);
        if (res.data.msg === "친구 요청 성공") {
          setFriendship("SEND");
          window.alert("친구 요청을 보냈습니다.");
        } else if (res.data.msg === "친구 요청 취소 성공") {
          setFriendship("NONE");
          window.alert("친구 요청을 취소했습니다.");
        } else if (res.data.msg === "친구 요청 수락 성공") {
          setFriendship("FRIEND");
          window.alert("친구 요청을 수락했습니다.");
        } else if (res.data.msg === "친구 관계 끊기 성공") {
          setFriendship("NONE");
          window.alert("친구 관계를 끊었습니다.");
        }
      })
      .catch((err) => {
        console.error("친구상태변경실패", err);
        window.alert("오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <>
      <PC>
        <div className="w-full flex flex-col items-center">
          {/* 프로필 배경 */}
          <div className="border-8 rounded-2xl border-red-200">
            <div
              className={`border-4 w-[1000px] h-[350px] flex-col m-1 border-blue-200 rounded-2xl`}
              style={{
                backgroundImage: `url(${
                  profileInfo && profileInfo.userBackImg
                })`,
                backgroundSize: "cover",
              }}
            >
              <div className="flex justify-between m-1">
                <div className="m-1 w-[550px] h-[220px]">
                  <div className="m-1 w-[200px] h-[200px] grid place-items-center">
                    <ProfileImage
                      userImg={profileInfo && profileInfo.userProfileImg}
                    />
                  </div>
                </div>
                <div className="m-1 w-[550px] h-[200px] flex justify-end">
                  <div className="pt-[12px] mr-2">
                    {/* <Check check={check} /> */}
                  </div>
                  {profileInfo && profileInfo.bankruptcy ? <Poor /> : null}
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
                    {profileInfo && profileInfo.userName}
                  </div>
                </div>
                <div>
                  <UserCurrentAlias
                    alias={profileInfo && profileInfo.userAlias}
                  />
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
                  불명예의 전당
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
              className={`border-4 w-full h-[350px] flex-col border-blue-200 rounded-2xl`}
              style={{
                backgroundImage: `url(${
                  profileInfo && profileInfo.userBackImg
                })`,
                backgroundSize: "cover",
              }}
            >
              <div className="flex justify-between m-1">
                <div className="m-1 w-[550px] h-[220px]">
                  <div className="m-1 w-[150px] h-[150px] grid place-items-center">
                    {/* <ProfileImage userImg={profileInfo.userProfileImg} /> */}
                  </div>
                </div>
                <div className="m-1 w-[550px] h-[200px] flex justify-end">
                  <div className="pt-[12px] mr-2">
                    {/* <Check check={check} /> */}
                  </div>
                  {profileInfo && profileInfo.bankruptcy ? <Poor /> : null}
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
                    {profileInfo && profileInfo.userName}
                  </div>
                </div>
                <div className="mr-2">
                  <UserCurrentAlias
                    alias={profileInfo && profileInfo.userAlias}
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-[50px] flex justify-center">
              <div
                className={`${classes.menu} ${classes.SMN_effect} font-bold flex text-2xl`}
              >
                <div className="grid grid-cols-3 place-items-center gap-10">
                  <Link
                    to={`/main/profile/${profileInfo && profileInfo.userId}`}
                    className="h-[30px]"
                  >
                    도감
                  </Link>
                  <Link
                    to={`/main/profile/${
                      profileInfo && profileInfo.userId
                    }/dishonor`}
                  >
                    불명예의 전당
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

// import useProfileStore from "@/store/profile/profileStore";
// import useFriendshipStore from "@/store/profile/friendshipStore";
// import { useProfile } from "@/hooks/profile/queries/useUserProfileQuery";
// import { useFriendship } from "@/hooks/profile/queries/useFriendshipQuery";
// import { useEnterDmPost } from "@/hooks/dm/mutations/useEnterDmPost";
// import { useFriendshipChangePost } from "@/hooks/profile/mutations/useFriendshipChangePost";
// const { profileInfo, setProfileInfo } = useProfileStore();
// const { friendship, setFriendship } = useFriendshipStore();

// const { useUserProfileQuery } = useProfile();
// const { data: userProfileData, refetch: dataRefetch } = useUserProfileQuery(
//   params.id!
// );

// const { useFriendshipQuery } = useFriendship();
// const { data: friendshipData, refetch: friendshipRefetch } =
//   useFriendshipQuery(params.id!);

// useEffect(() => {
//   if (userProfileData) {
//     setProfileInfo(userProfileData);
//     console.log("프로필 유저 정보", userProfileData);
//   } else {
//     console.log("프로필 유저 정보 없음");
//   }
// }, [userProfileData, setProfileInfo]);

// useEffect(() => {
//   friendshipRefetch();
//   dataRefetch();
// }, [friendshipRefetch, dataRefetch]);

// const enterDmMutation = useEnterDmPost();
// const { mutate: dmMutate } = enterDmMutation;

// const enterChatHandler = () => {
//   dmMutate(params.id!);
// };

// useEffect(() => {
//   if (friendshipData) {
//     setFriendship(friendshipData);
//     console.log("프로필 유저와 친구관계", friendshipData);
//   } else {
//     console.log("프로필 유저와 친구관계 없음");
//   }
// }, [friendship, setFriendship]);

// const friendshipChangeMutation = useFriendshipChangePost();
// const { mutate: friendshipChangeMutate } = friendshipChangeMutation;

// const changeFriendStatusHandler = () => {
//   friendshipChangeMutate(params.id!);
// };
