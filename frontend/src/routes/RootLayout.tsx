import cn from "clsx";
const electron = window.electron;
import { useEffect, useState } from "react";
import { Alarm } from "@/components/navbar/Alarm";
import useUserStore from "@/store/user/userStore";
import { Mobile, PC } from "@/components/MediaQuery";
import classes from "@/routes/RootLayout.module.css";
import FriendsBtn from "@/components/navbar/FriendsBtn";
import { EventSourcePolyfill } from "event-source-polyfill";
import SpeakerToast from "@/components/navbar/SpeakerToast";
import { ModeToggle } from "@/components/navbar/ModeToggle";
import { useTheme } from "@/components/navbar/ThemeProvider";
import { useLocation, Link, Outlet } from "react-router-dom";
// import useAlarmSubscribeStore from "@/store/alarm/subscribeStore";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useFriendStore from "@/store/friend/friendStore";
import { useFriendList } from "@/hooks/friend/queries/useFriendListQuery";
import { useUserData } from "@/hooks/user/queries/useUserDataQuery";
import usePointStore from "@/store/user/pointStore";
import { usePoint } from "@/hooks/user/queries/useUserPointQuery";

export default function RootLayout() {
  const { pathname } = useLocation();
  const { theme } = useTheme();

  const { userInfo } = useUserStore();

  const { useUserDataQuery } = useUserData();
  const { setUserInfo } = useUserStore();
  const { data: userData } = useUserDataQuery();

  useEffect(() => {
    if (userData) {
      setUserInfo(userData);
    } else {
      console.log("유저 정보 없음");
    }
  }, [userData]);

  const { setPoint } = usePointStore();
  const { usePointQuery } = usePoint();
  const { data: userPointData } = usePointQuery();

  useEffect(() => {
    if (userPointData) {
      setPoint(userPointData);
    } else {
      console.log("포인트 정보 없음");
    }
  }, [userPointData]);

  const { setFriendList } = useFriendStore();
  const { useFriendListQuery } = useFriendList();
  const { data: friendListData } = useFriendListQuery();

  useEffect(() => {
    if (friendListData) {
      setFriendList(friendListData);
    } else {
      console.log("친구 목록 없음");
    }
  }, []);

  // const { setLastEventId } = useAlarmSubscribeStore();

  // 확성기 내용 state
  const [speakerToastContent, setSpeakerToastContent] = useState<string>(""); // 보여줄 확성기
  const [newSpeakerContent, setNewSpeakerContent] = useState<string>(""); // 서버에게서 받은 새로운 확성기
  const [speakerToastList, setSpeakerToastList] = useState<string[]>([]);
  const [showSpeakerToast, setShowSpeakerToast] = useState<boolean>(false);

  const EventSource = EventSourcePolyfill;

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found");
  }

  const source = new EventSource(
    `${import.meta.env.VITE_API_BASE_URL}/api/alarm/subscribe`,
    {
      headers: {
        Authorization: token,
      },
      heartbeatTimeout: 3600000,
    }
  );

  source.onerror = (event) => {
    console.log(event);
    source.close();
  }

  useEffect(() => {
    // source.addEventListener("notification", (e: any) => {
    //   console.log(e);
    //   const data = JSON.parse(e.data);
    //   console.log(data);
    //   setLastEventId(data.id);
    // });

    source.addEventListener("megaphone", (event: any) => {
      const parseData = JSON.parse(event.data);

      // 새로운 확성기가 있음을 표시
      setNewSpeakerContent(parseData.content);
      setSpeakerToastList((prev) => {
        return prev.concat(parseData.content);
      });
    });

    return () => {
      source.close();
    };
  }, []);

  useEffect(() => {
    if (!showSpeakerToast && speakerToastList.length != 0) {
      // 확성기 리스트 중 첫번째 요소를 보여주기
      setSpeakerToastContent(speakerToastList[0]);
      setSpeakerToastList((prev) => prev.slice(1));
      setShowSpeakerToast(true);
    }
  }, [newSpeakerContent, showSpeakerToast]);

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // 예스크롤을 내릴 때 네브바를 숨김, 올리면 다시 보임
      setIsNavbarVisible(
        currentScrollPos <= 0 || currentScrollPos < prevScrollPos
      );

      // 현재 스크롤 위치를 업데이트
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <PC>
        {/* 확성기 자리 */}
        {showSpeakerToast && (
          <SpeakerToast
            setToast={setShowSpeakerToast}
            text={speakerToastContent}
          />
        )}
        <main className={classes.page}>
          {/* 왼쪽 사이드바 영역*/}
          <div
            className={cn(classes.section_left, {
              [classes.electron_section_left]: typeof electron !== "undefined",
            })}
          >
            {/* 로고 이미지 */}
            <Link to="/main" className="mt-5 mb-20 w-4/5">
              <img alt="logo" src="/image/logo.png" />
            </Link>
            {/* 사이드바 메뉴 */}
            <Link to="/main/item" className={`${classes.menu}`}>
              <h1>아이템샵</h1>
            </Link>
            <Link to="/main/messagelist" className={`${classes.menu}`}>
              <h1>메세지함</h1>
            </Link>
            {typeof electron !== "undefined" && (
              <Link to="/main/setting" className={`${classes.menu}`}>
                <h1>환경 설정</h1>
              </Link>
            )}
            <Link to="/main/intro" className={classes.menu}>
              <h1>서비스 소개</h1>
            </Link>
          </div>

          {/* 네브바와 메인 페이지를 포함하는 영역 */}
          <div
            className={cn(classes.section_right, {
              [classes.electron_section_right]: typeof electron !== "undefined",
            })}
          >
            {/* 네브바 */}
            {isNavbarVisible ? (
              theme === "light" ? (
                <nav className={classes.nav}>
                  <div></div>

                  {/* 로고 */}

                  {/* 네브바 오른쪽 영역 */}
                  <div className={classes.nav_right}>
                    {/* 다크모드 버튼 (미완, 후순위) */}
                    <ModeToggle />
                    {/* 사용자 프로필 버튼 */}
                    <Link
                      to={`/main/profile/${userInfo.userId}`}
                      className="mx-7 lg:hover:scale-125 transition-transform ease-in-out duration-500"
                    >
                      <Avatar>
                        <AvatarImage
                          src={userInfo.userProfileImg}
                          alt="프사"
                          className="bg-cover"
                        />
                        <AvatarFallback>프사</AvatarFallback>
                      </Avatar>
                      {/* <div className={classes.user_image} /> */}
                    </Link>
                    <Alarm />
                    <FriendsBtn />
                  </div>
                </nav>
              ) : (
                <nav className={classes.nav_dark}>
                  <div></div>

                  {/* 로고 */}

                  {/* 네브바 오른쪽 영역 */}
                  <div className={classes.nav_right}>
                    {/* 다크모드 버튼 (미완, 후순위) */}
                    <ModeToggle />
                    {/* 사용자 프로필 버튼 */}
                    <Link
                      to={`/main/my-profile`}
                      className="mx-7 lg:hover:scale-125 transition-transform ease-in-out duration-500"
                    >
                      <Avatar>
                        <AvatarImage
                          src={userInfo.userProfileImg}
                          alt="프사"
                          className="bg-cover"
                        />
                        <AvatarFallback className="text-xs">
                          프사
                        </AvatarFallback>
                      </Avatar>
                      {/* <div className={classes.user_image} /> */}
                    </Link>

                    <Alarm />
                    <FriendsBtn />
                  </div>
                </nav>
              )
            ) : undefined}

            {/* 메인 페이지 영역 */}
            <div className={classes.body}>
              <Outlet />
            </div>
          </div>
        </main>
        <TailwindIndicator />
      </PC>

      <Mobile>
        {/* 확성기 자리 */}
        {showSpeakerToast && (
          <SpeakerToast
            setToast={setShowSpeakerToast}
            text={speakerToastContent}
          />
        )}
        <main className={classes.page}>
          {/* 네브바와 메인 페이지를 포함하는 영역 */}
          <div
            className={cn(classes.section_right_M, {
              [classes.electron_section_right]: typeof electron !== "undefined",
            })}
          >
            {/* 네브바 */}
            <nav className={classes.nav_M}>
              {/* 로고 */}
              <Link to="/main" className="ml-5">
                <img alt="logo" src="/image/logo.png" />
              </Link>

              {/* 네브바 오른쪽 영역 */}
              <div className={classes.nav_right_M}>
                {/* 사용자 프로필 버튼 */}
                <Link
                  to={`/main/my-profile`}
                  className="mx-7 lg:hover:scale-125 transition-transform ease-in-out duration-500"
                >
                  <Avatar>
                    <AvatarImage
                      src={userInfo.userProfileImg}
                      alt="프사"
                      className="bg-cover"
                    />
                    <AvatarFallback className="text-xs">프사</AvatarFallback>
                  </Avatar>
                  {/* <div className={classes.user_image} /> */}
                </Link>

                <Alarm />
                <FriendsBtn />
              </div>
            </nav>

            {/* 메인 페이지 영역 */}
            <div className={classes.body_M}>
              {/* 사이드바 메뉴 */}
              <div className="flex border-4 rounded-xl mx-3 border-orange-200 mb-20">
                <Link to="/main/item" className={classes.menu_M}>
                  <h1>아이템샵</h1>
                </Link>
                <Link to="/main/messagelist" className={classes.menu_M}>
                  <h1>메세지함</h1>
                </Link>
                {typeof electron !== "undefined" && (
                  <Link to="/main/setting" className={classes.menu_M}>
                    <h1>환경 설정</h1>
                  </Link>
                )}
              </div>
              <Outlet />
            </div>
          </div>
        </main>
      </Mobile>
    </>
  );
}
