import Poor from "@/components/profile/Poor";
import classes from "./ProfilePage.module.css";
import { Button } from "@/components/ui/button";
import { Mobile, PC } from "@/components/MediaQuery";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import ProfileImage from "@/components/profile/ProfileImage";
import UserCurrentAlias from "@/components/UserCurrentAlias";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "@/types/userTypes";
import ProfileEdit from "@/components/profile/ProfileEdit";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;
  const token = localStorage.getItem("token");
  const [profileInfo, setProfileInfo] = useState<UserType>();
  const myId = localStorage.getItem("userId");
  useEffect(() => {
    
    if (profileInfo == undefined || profileInfo.userId.toString() != userId) {
      axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/data/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const newProfileInfo = res.data.data;
        setProfileInfo({ ...profileInfo, ...newProfileInfo });
        
      })
      .catch((err) => {
        console.error("프로필정보가져오기실패", err);
      });
    }
  }, [userId, profileInfo]);

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
        console.log("채팅방 입장성공", res.data.data);
        const roomId = res.data.data;
        navigate(`/main/message/${roomId}`, { state: profileInfo });
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
        <div className=" w-[90%] m-10 mt-20">
          {/* 프로필 배경 */}
          <div
            className="h-[380px] rounded-xl z-1 rounded-b-none"
            style={{
              backgroundImage: `url(${profileInfo && profileInfo.userBackImg})`,
              backgroundSize: "cover",
            }}
          ></div>

          {/* 유저 프로필 전체*/}
          <div className="bg-white bg-opacity-60 z-2 -mt-40 flex p-2 pl-4 justify-between h-[160px]">
            <div className="flex justify-center items-center">
              {/* 프로필 사진 */}
              <div className="m-1 w-[100px] h-[100px] mr-6">
                <ProfileImage
                  userImg={
                    profileInfo && profileInfo.userProfileImg
                      ? profileInfo.userProfileImg
                      : ""
                  }
                />
              </div>

              {/* 이름이랑 칭호 */}
              <div className="flex flex-col items-center">
                {/* 이름 */}
                <div className=" text-black font-bold text-xl mb-3 drop-shadow">
                  {profileInfo && profileInfo.userName
                    ? profileInfo.userName
                    : ""}
                </div>
                {/* 칭호 */}
                <div className="">
                  <UserCurrentAlias
                    alias={
                      profileInfo && profileInfo.userAlias
                        ? profileInfo.userAlias
                        : null
                    }
                  />
                </div>
              </div>
            </div>

            {/* 메시지랑 프로필편집or친구 */}
            <div className="m-1 flex">
              {userId === myId ? null : (
                <Button
                  type="submit"
                  variant="secondary"
                  className="mr-1 bg-white font-bold text-xs"
                  onClick={() => {
                    enterChatHandler();
                  }}
                >
                  메시지
                </Button>
              )}

              {/* 프로필편집 또는 친구버튼 */}
              {userId === myId ? (
                <ProfileEdit />
              ) : (
                <div>
                  {(friendship === "FRIEND" && (
                    <Button
                      onClick={changeFriendStatusHandler}
                      variant="secondary"
                      className="mr-1 bg-white font-bold text-xs"
                    >
                      친구끊기
                    </Button>
                  )) ||
                    (friendship === "RECEIVE" && (
                      <Button
                        onClick={changeFriendStatusHandler}
                        variant="secondary"
                        className="mr-1 bg-white font-bold text-xs"
                      >
                        수락
                      </Button>
                    )) ||
                    (friendship === "SEND" && (
                      <Button
                        onClick={changeFriendStatusHandler}
                        variant="secondary"
                        className="mr-1 bg-white font-bold text-xs"
                      >
                        요청취소
                      </Button>
                    )) ||
                    (friendship === "NONE" && (
                      <Button
                        onClick={changeFriendStatusHandler}
                        variant="secondary"
                        className="mr-1 bg-white font-bold text-xs"
                      >
                        친구신청
                      </Button>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* 도감 불명예 부분 */}
          <div className="rounded-b-xl bg-gray-100 relative">
            <div
              className={`${classes.menu} ${classes.SMN_effect} font-bold text-md flex justify-center items-center py-4 shadow-md sticky top-0`}
            >
              <Link to={`/main/profile/${params.id}`} className="mr-10">
                📜도감
              </Link>
              <Link
                to={`/main/profile/${params.id}/dishonor`}
                className="mr-10"
              >
                🔥명예의 전당
              </Link>
            </div>
            <div className="flex justify-center">
              <Separator className="bg-zinc-300 w-full " />
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
                  {userId === myId ? (
                    <ProfileEdit />
                  ) : (
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
                  )}
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
                    alias={profileInfo ? profileInfo.userAlias || "" : ""}
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
