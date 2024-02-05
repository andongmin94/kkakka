import cn from "clsx";
const electron = window.electron;
import { useEffect } from "react";
import { Alarm } from "@/components/navbar/Alarm";
import { Mobile, PC } from "@/components/MediaQuery";
import classes from "@/routes/RootLayout.module.css";
import FriendsBtn from "@/components/navbar/FriendsBtn";
import { ModeToggle } from "@/components/navbar/ModeToggle";
import { useTheme } from "@/components/navbar/ThemeProvider";
import { useLocation, Link, Outlet } from "react-router-dom";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useMyDataQuery from "@/apis/user/queries/useMyDataQuery";

export default function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 페이지 이동시마다 스크롤바는 항상 최상단에 위치하게 한다.
    window.scrollTo(0, 0);
  }, [pathname]);

  const { theme } = useTheme();

  const { userData, isLoading, error } = useMyDataQuery();

  if (!userData) {
    return <div>로딩중...</div>;
  }

  // 사용자 아이디 더미 데이터
  const userId = "1";

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
            {theme === "light" ? (
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
                    to={`/main/profile/${userId}`}
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
            )}

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
                  to={`/main/profile/${userId}`}
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
