import { Link, Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";
import FriendsBtn from "@/components/friendsBtn";
import Alarm from "@/components/alarm";

export default function RootLayout() {
  return (
    <>
      <main className={classes.page}>
        {/* 왼쪽 사이드바 영역*/}
        <div className={classes.section_left}>
          {/* 로고 이미지 */}
          <Link to="/" className={classes.logo_image} />
          {/* 사이드바 메뉴 */}
          <Link to="/item" className={classes.menu}>
            <h1>아이템샵</h1>
          </Link>
          <Link to="/message" className={classes.menu}>
            <h1>메세지함</h1>
          </Link>
          <Link to="/setting" className={classes.menu}>
            <h1>환경 설정</h1>
          </Link>
          <Link to="/intro" className={classes.menu}>
            <h1>서비스 소개</h1>
          </Link>
        </div>

        {/* 네브바와 메인 페이지를 포함하는 영역 */}
        <div className={classes.section_right}>
          {/* 네브바 */}
          <nav className={classes.nav}>
            <div></div>

            {/* 로고 */}
            <h1>확성기 자리</h1>

            {/* 네브바 오른쪽 영역 */}
            <div className={classes.nav_right}>
              {/* 사용자 프로필 버튼 */}
              <div className={classes.user_image} />
              {/* 알림 버튼 */}
              <Alarm />
              {/* 친구 버튼 */}
              <FriendsBtn />
            </div>
          </nav>

          {/* 메인 페이지 영역 */}
          <div className={classes.body}>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
