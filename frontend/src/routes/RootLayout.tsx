import cn from "clsx";
const electron = window.electron;
import { useEffect, useState } from "react";
import { Alarm } from "@/components/navbar/Alarm";
import { Mobile, PC } from "@/components/MediaQuery";
import classes from "@/routes/RootLayout.module.css";
import FriendsBtn from "@/components/navbar/FriendsBtn";
import { EventSourcePolyfill } from "event-source-polyfill";
import SpeakerToast from "@/components/navbar/SpeakerToast";
import { useLocation, Link, Outlet, useNavigate } from "react-router-dom";
import useAlarmSubscribeStore from "@/store/alarm/subscribeStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ToTheTop from "@/components/app/ToTheTop";
import { UserType } from "@/types/userTypes";
import useUserStore from "@/store/user/userStore";
import useAlarmStore from "@/store/alarm/alarmStore";

import axios from "axios";
import SearchFriendBtn from "@/components/navbar/SearchFriendBtn";
// import { TailwindIndicator } from "@/components/TailwindIndicator";

export default function RootLayout() {
  const token = localStorage.getItem("token");

  const { pathname } = useLocation();
  // const { theme } = useTheme();

  const { setLastEventId } = useAlarmSubscribeStore();
  const { alarmList, setAlarmList } = useAlarmStore();
  // 확성기 내용 state
  const [speakerToastContent, setSpeakerToastContent] = useState<string>(""); // 보여줄 확성기
  const [newSpeakerContent, setNewSpeakerContent] = useState<string>(""); // 서버에게서 받은 새로운 확성기
  const [speakerToastList, setSpeakerToastList] = useState<string[]>([]);
  const [showSpeakerToast, setShowSpeakerToast] = useState<boolean>(false);

  const EventSource = EventSourcePolyfill;

  const [userData, setUserData] = useState<UserType>();
  const { setUserInfo } = useUserStore();

  useEffect(() => {
    if (!userData) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/data`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          localStorage.setItem("userId", res.data.data.userId);
          localStorage.setItem("userName", res.data.data.userName);
          localStorage.setItem("userProfileImg", res.data.data.userProfileImg);
          localStorage.setItem("userBackImg", res.data.data.userBackImg);
          localStorage.setItem("userAlias", res.data.data.userAlias);
          setUserData(res.data.data);
          setUserInfo(res.data.data);
          console.log("check");
          {
            typeof electron !== "undefined" &&
              electron.send("userInfo", res.data.data);
          }
          {
            typeof electron !== "undefined" && electron.send("token", token);
          }
        });
    }
  }, [userData]);

  const userId = localStorage.getItem("userId");
  const userProfileImg = localStorage.getItem("userProfileImg");

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      window.alert("로그인이 필요한 서비스입니다.");
      navigate("/");
    } else {
      const source = new EventSource(
        `${import.meta.env.VITE_API_BASE_URL}/api/alarm/subscribe`,
        {
          headers: {
            Authorization: token,
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
          heartbeatTimeout: 3600000,
        }
      );

      source.onerror = (event) => {
        console.log(event);
        source.close();
      };

      source.addEventListener("alarm", (e: any) => {
        console.log(e);
        const data = JSON.parse(e.data);
        console.log(data);
        setAlarmList([data, ...alarmList]);
        setLastEventId(data.alarmId);
      });

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
    }
  });

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

      setIsArrowVisible(
        currentScrollPos > 300 && currentScrollPos < document.body.scrollHeight
      );
      // 현재 스크롤 위치를 업데이트
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isArrowVisible, setIsArrowVisible] = useState(false);

  return (
    <>
      <PC>
        {isArrowVisible && <ToTheTop />}

        <div
          className={classes.backback}
          style={{
            backgroundImage: `url(https://ssafys3.s3.ap-northeast-2.amazonaws.com/static/%EB%A1%A4+%EB%B0%B0%EA%B2%BD.jpg)`,
          }}
        >
          <div className={classes.whole}>
            {/* 확성기 자리 */}
            {showSpeakerToast && (
              <SpeakerToast
                setToast={setShowSpeakerToast}
                text={speakerToastContent}
              />
            )}
            <main
              className={cn(classes.page, {
                [classes.electron_page]: typeof electron !== "undefined",
              })}
            >
              {/* 왼쪽 사이드바 영역*/}
              <div className={classes.section_left}>
                <div className={classes.menu_items}>
                  {/* 로고 이미지 */}
                  <Link to="/main" className="mt-10 mb-10">
                    <img alt="logo" src="/image/logo.png" />
                  </Link>
                  {/* 사이드바 메뉴 */}
                  <Link to="/main/item" className={`${classes.menu}`}>
                    <h1>아이템샵</h1>
                  </Link>
                  <Link to="/main/messagelist" className={`${classes.menu}`}>
                    <h1>메세지함</h1>
                  </Link>
                  {/* {typeof electron !== "undefined" && (
                    <Link to="/main/setting" className={`${classes.menu}`}>
                      <h1>환경 설정</h1>
                    </Link>
                  )} */}
                  <Link to="/main/intro" className={classes.menu}>
                    <h1>서비스 소개</h1>
                  </Link>
                  {typeof electron === "undefined" && (
                    <a
                      href="/까까 Setup 1.0.0.exe"
                      download
                      className={`${classes.menu}`}
                    >
                      <h1>
                        App Download <span className="text-sm">(543MB)</span>
                      </h1>
                    </a>
                  )}
                </div>
              </div>

              {/* 네브바와 메인 페이지를 포함하는 영역 */}
              <div className={classes.section_right}>
                {/* 네브바 */}
                {isNavbarVisible ? (
                  <nav className={classes.nav}>
                    <div></div>

                    {/* 로고 */}

                    {/* 네브바 오른쪽 영역 */}
                    <div className={classes.nav_right}>
                      {/* 다크모드 버튼 (미완, 후순위)
                        <ModeToggle /> */}
                      {/* 사용자 프로필 버튼 */}
                      <Link
                        to={`/main/profile/${userId}`}
                        className="mx-7 lg:hover:scale-125 transition-transform ease-in-out duration-500"
                      >
                        <Avatar>
                          <AvatarImage
                            src={userProfileImg ?? "/default-image.png"}
                            alt="프사"
                            className="bg-cover text-xs"
                          />
                          <AvatarFallback>😶</AvatarFallback>
                        </Avatar>
                        {/* <div className={classes.user_image} /> */}
                      </Link>
                      <Alarm />
                      <FriendsBtn />
                      <SearchFriendBtn />
                    </div>
                  </nav>
                ) : undefined}

                {/* 메인 페이지 영역 */}
                <div className={classes.body}>
                  <Outlet />
                </div>
              </div>
            </main>
            {/* <TailwindIndicator /> */}
          </div>
        </div>
      </PC>

      <Mobile>
        {/* 확성기 자리 */}
        {showSpeakerToast && (
          <SpeakerToast
            setToast={setShowSpeakerToast}
            text={speakerToastContent}
          />
        )}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <Outlet />
      </Mobile>
    </>
  );
}
