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
import axios from "axios";
import { UserType } from "@/types/userTypes";

export default function RootLayout() {
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState<UserType | null>(null);

  // 스크롤 내릴땐 네브바가 안보이게
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    // 페이지 이동시마다 스크롤바는 항상 최상단에 위치하게 한다.
    window.scrollTo(0, 0);
  }, [pathname]);

  // 로그인한 유저 데이터 불러오기
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/data`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setUserData(res.data.data);
        ///////////// 일렉트론에서 쓰는 통신임 //////////////////
        {typeof electron !== "undefined" && electron.send("userInfo", res.data.data)}
        {typeof electron !== "undefined" && electron.send("token", localStorage.getItem("token"))}
        ///////////// 일렉트론에서 쓰는 통신임 //////////////////
      });

    // ------------------------------
    // 스크롤바 부분
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

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { theme } = useTheme();

  // 알림 SSE 구독 -> 로그인시 딱 한번만
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/alarm/subscribe`, {
      headers: {
        Authorization: token,
      },
    });
  }, []);

  const [lastEventId, setLastEventId] = useState<string>("");
  // 마지막 이벤트 아이디 어떻게 받아올지 생각해봐

  // request body로 LastEventId (SSE가 생성한 eventId) 보내야 함.
  const updateLastEventId = () => {
    axios
      .put(
        `${import.meta.env.VITE_API_BASE_URL}/api/alarm/`,
        { LastEventId: lastEventId },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

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
                  <h1>확성기 자리</h1>

                  {/* 네브바 오른쪽 영역 */}
                  <div className={classes.nav_right}>
                    {/* 다크모드 버튼 (미완, 후순위) */}
                    <ModeToggle />
                    {/* 사용자 프로필 버튼 */}
                    <Link
                      to={`/main/profile/${userData && userData.userId}`}
                      className="mx-7 lg:hover:scale-125 transition-transform ease-in-out duration-500"
                    >
                      {/* 일단 나중에 동적으로 프사 받을 수 있도록 형식 변경함 */}
                      <Avatar>
                        <AvatarImage
                          src={userData && userData.userProfileImg}
                          alt="프사"
                          className="bg-cover"
                        />
                        <AvatarFallback>프사</AvatarFallback>
                      </Avatar>
                      {/* <div className={classes.user_image} /> */}
                    </Link>

                    {/* 알림 버튼 */}
                    <Alarm />
                    {/* 친구 버튼 */}
                    <FriendsBtn />
                  </div>
                </nav>
              ) : (
                <nav className={classes.nav_dark}>
                  <div></div>

                  {/* 로고 */}
                  <h1>확성기 자리</h1>

                  {/* 네브바 오른쪽 영역 */}
                  <div className={classes.nav_right}>
                    {/* 다크모드 버튼 (미완, 후순위) */}
                    <ModeToggle />
                    {/* 사용자 프로필 버튼 */}
                    <Link
                      to={`/main/profile/${userData && userData.userId}`}
                      className="mx-7 lg:hover:scale-125 transition-transform ease-in-out duration-500"
                    >
                      {/* 일단 나중에 동적으로 프사 받을 수 있도록 형식 변경함 */}
                      <Avatar>
                        <AvatarImage
                          src="/image/liveImage.png"
                          alt="프사"
                          className="bg-cover"
                        />
                        <AvatarFallback>프사</AvatarFallback>
                      </Avatar>
                      {/* <div className={classes.user_image} /> */}
                    </Link>

                    {/* 알림 버튼 */}
                    <Alarm onClick={updateLastEventId} />
                    {/* 친구 버튼 */}
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
                  to={`/main/profile/${userData && userData.userId}`}
                  className="mx-7 lg:hover:scale-125 transition-transform ease-in-out duration-500"
                >
                  {/* 일단 나중에 동적으로 프사 받을 수 있도록 형식 변경함 */}
                  <Avatar>
                    <AvatarImage
                      src="/image/liveImage.png"
                      alt="프사"
                      className="bg-cover"
                    />
                    <AvatarFallback>프사</AvatarFallback>
                  </Avatar>
                  {/* <div className={classes.user_image} /> */}
                </Link>

                {/* 알림 버튼 */}
                <Alarm />
                {/* 친구 버튼 */}
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
