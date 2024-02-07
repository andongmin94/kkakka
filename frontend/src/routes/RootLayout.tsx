import cn from "clsx";
const electron = window.electron;
import { useEffect, useState } from "react";
import { Alarm } from "@/components/navbar/Alarm";
import { Mobile, PC } from "@/components/MediaQuery";
import classes from "@/routes/RootLayout.module.css";
import FriendsBtn from "@/components/navbar/FriendsBtn";
import { ModeToggle } from "@/components/navbar/ModeToggle";
import { useTheme } from "@/components/navbar/ThemeProvider";
import { useLocation, Link, Outlet } from "react-router-dom";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/store/user/userStore";
import usePointStore from "@/store/user/pointStore";
import useAlarmSubscribeStore from "@/store/alarm/subscribeStore";
import { useUserData } from "@/hooks/user/queries/useUserDataQuery";
import { usePoint } from "@/hooks/user/queries/useUserPointQuery";
import { EventSourcePolyfill } from "event-source-polyfill";
import SpeakerToast from "@/components/navbar/SpeakerToast";

export default function RootLayout() {
  const { pathname } = useLocation();
  const { theme } = useTheme();

  const { useUserDataQuery } = useUserData();
  const { userInfo, setUserInfo } = useUserStore();
  const { data: userData } = useUserDataQuery();

  const { point, setPoint } = usePointStore();
  const { usePointQuery } = usePoint();
  const { data: userPointData } = usePointQuery();

  useEffect(() => {
    if (userData) {
      setUserInfo(userData);
    } else {
      console.log("유저 정보 없음");
    }
  }, [userData]);

  useEffect(() => {
    if (userPointData) {
      setPoint(userPointData);
    } else {
      console.log("포인트 정보 없음");
    }
  }, [userPointData]);

  const { lastEventId, setLastEventId } = useAlarmSubscribeStore();

  // 확성기 내용 state
  const [speakerToastContent, setSpeakerToastContent] = useState<string>("");
  const [speakerToast, setSpeakerToast] = useState<boolean>(false);

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
    }
  );

  useEffect(() => {
    source.addEventListener("notification", (e: any) => {
      console.log(e);
      const data = JSON.parse(e.data);
      console.log(data);
      setLastEventId(data.id);
    });

    source.addEventListener("megaphone", (event) => {
      // useEffect 안에 있어서 set이 잘 안됨는거 같음
      const parseData = JSON.parse(event.data);

      setSpeakerToast(true);
      setSpeakerToastContent(parseData.content);
    });

    return () => {
      source.close();
    };
  }, [setLastEventId]);

  // 확성기 내용이 새로 생길 때 실행
  useEffect(() => {
    console.log(speakerToastContent);
  }, [speakerToastContent]);

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
            <Link to="/main/item" className={classes.menu}>
              <h1>아이템샵</h1>
            </Link>
            <Link to="/main/messagelist" className={classes.menu}>
              <h1>메세지함</h1>
            </Link>
            {typeof electron !== "undefined" && (
              <Link to="/main/setting" className={classes.menu}>
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
                  {/* 확성기 자리 */}
                  {speakerToast && (
                    <SpeakerToast
                      setToast={setSpeakerToast}
                      text={speakerToastContent}
                    />
                  )}
                  {speakerToast && (
                    <SpeakerToast
                      setToast={setSpeakerToast}
                      text={speakerToastContent}
                    />
                  )}
                  {/* 네브바 오른쪽 영역 */}
                  <div className={classes.nav_right}>
                    {/* 다크모드 버튼 (미완, 후순위) */}
                    <ModeToggle />
                    {/* 사용자 프로필 버튼 */}
                    <Link
                      to={`/main/profile/${userInfo && userInfo.userId}`}
                      className="mx-7 lg:hover:scale-125 transition-transform ease-in-out duration-500"
                    >
                      <Avatar>
                        <AvatarImage
                          src={userInfo && userInfo.userProfileImg}
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
                  {/* 확성기 자리 */}
                  {speakerToast && (
                    <SpeakerToast
                      setToast={setSpeakerToast}
                      text={speakerToastContent}
                    />
                  )}
                  {/* 네브바 오른쪽 영역 */}
                  <div className={classes.nav_right}>
                    {/* 다크모드 버튼 (미완, 후순위) */}
                    <ModeToggle />
                    {/* 사용자 프로필 버튼 */}
                    <Link
                      to={`/main/profile/${userInfo && userInfo.userId}`}
                      className="mx-7 lg:hover:scale-125 transition-transform ease-in-out duration-500"
                    >
                      <Avatar>
                        <AvatarImage
                          src={userInfo && userInfo.userProfileImg}
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
              {/* 로고 이미지 */}
              <Link to="/main" className="ml-5">
                <img alt="logo" src="/image/logo.png" />
              </Link>

              {/* 네브바 오른쪽 영역 */}
              <div className={classes.nav_right_M}>
                {/* 사용자 프로필 버튼 */}
                <Link
                  to={`/main/profile/${userInfo && userInfo.userId}`}
                  className="mx-7 lg:hover:scale-125 transition-transform ease-in-out duration-500"
                >
                  {/* 일단 나중에 동적으로 프사 받을 수 있도록 형식 변경함 */}
                  <Avatar>
                    <AvatarImage
                      src={userInfo && userInfo.userProfileImg}
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
