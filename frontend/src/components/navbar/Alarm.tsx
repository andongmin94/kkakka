import { useState, useEffect } from "react";
import classes from "@/components/navbar/Alarm.module.css";
// import { useTheme } from "@/components/navbar/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAlarmStore from "@/store/alarm/alarmStore";
import useAlarmSubscribeStore from "@/store/alarm/subscribeStore";
import { useCheckAlarm } from "@/hooks/alarm/mutations/useCheckAlarmPut";
import axios from "axios";
import { AlarmType } from "@/types/alarmTypes";
import { useNavigate } from "react-router-dom";

export function Alarm() {
  // const { theme } = useTheme();
  const [position, setPosition] = useState("");
  const navigate = useNavigate();
  const checkAlarmMutation = useCheckAlarm();
  const { mutate } = checkAlarmMutation;

  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);

  const checkAlarmHandler = (alarmId: number) => {
    mutate(alarmId);
    setAlarmList(alarmList.filter((alarm) => alarm.alarmId !== alarmId));
  };

  const {
    alarmList,
    numOfUncheckedAlarm,
    lastNotiEventId,
    setAlarmList,
    setNumOfUncheckedAlarm,
    setLastNotiEventId,
  } = useAlarmStore();
  const { lastEventId, setLastEventId } = useAlarmSubscribeStore();

  const userId = localStorage.getItem("userId");
  // const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    setNumOfUncheckedAlarm(alarmList.length);
  }, [alarmList]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/alarm`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setAlarmList(res.data.data.alarmList);
        setLastEventId(res.data.data.alarmList[0].alarmId);
        setNumOfUncheckedAlarm(res.data.data.numOfUncheckedAlarm);
        if (res.data.data.lastNotiEventId != null) {
          console.log("갱신해요");
          setLastNotiEventId(res.data.data.lastNotiEventId);
        }
      })
      .catch((err) => {
        console.error("알람 정보를 가져오는데 실패했습니다.", err);
      });
  }, []);

  const moveToAlarmContentHandler = (alarm: AlarmType) => {
    if (alarm.alarmContent.endsWith("님이 친구요청을 보냈습니다.")) {
      navigate(`/main/profile/${alarm.relatedContentId}`);
    } else if (alarm.alarmContent.endsWith("새로운 칭호가 추가되었습니다.")) {
      navigate(`/main/profile/${userId}/dishonor`);
    } else {
      navigate(`/main/dogam/${alarm.relatedContentId}`);
    }
  };

  const setUserLastEventId = () => {
    if (openDropdownMenu == false) {
      if (lastEventId != "" && lastEventId > lastNotiEventId) {
        axios
          .put(
            `${import.meta.env.VITE_API_BASE_URL}/api/alarm`,
            {
              lastEventId: lastEventId,
            },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then(() => {
            console.log("갱신 성공");
            setLastNotiEventId(lastEventId);
          })
          .catch((err) => {
            console.error("Last Event Id 갱신 실패", err);
          });
      }

      setOpenDropdownMenu(true);
    } else {
      setOpenDropdownMenu(false);
    }
  };

  return (
    <div className="relative">
      <div>
        {lastEventId != "" &&
        (lastNotiEventId == "" || lastNotiEventId < lastEventId) ? (
          <div className="bg-red-500 w-2 h-2 rounded-full absolute left-6"></div>
        ) : null}
      </div>
      <DropdownMenu onOpenChange={setUserLastEventId}>
        <DropdownMenuTrigger asChild>
          {/* {theme === "light" ? ( */}

          <div className={classes.alarm_image} />

          {/* ) : (
            <div className={classes.alarm_image_dark} />
          )} */}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30 text-center">
          <DropdownMenuLabel>
            {numOfUncheckedAlarm !== 0
              ? `${numOfUncheckedAlarm}개의 알림이 있어요.`
              : "모든 알림을 확인했어요."}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            className="w-30 overflow-scroll scrollbar-hide max-h-[800px]"
            value={position}
            onValueChange={setPosition}
          >
            {alarmList.length > 0 &&
              alarmList.map((alarm) => {
                return (
                  <DropdownMenuRadioItem
                    value="top"
                    key={alarm.alarmId}
                    className="border-b-2 border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      checkAlarmHandler(alarm.alarmId);
                      moveToAlarmContentHandler(alarm);
                    }}
                  >
                    <div className="flex justify-center items-center py-2">
                      <img
                        src={alarm.alarmPic}
                        alt="alarm-pic"
                        className="w-10 h-10 rounded-full mr-4 shadow-md"
                      />
                      <div className="mr-2">{alarm.alarmContent}</div>
                      <div className="mr-4">
                        {alarm.createdAt.toString().substring(5, 7)}월{" "}
                        {alarm.createdAt.toString().substring(8, 10)}일
                      </div>
                    </div>
                  </DropdownMenuRadioItem>
                );
              })}
            <DropdownMenuSeparator />
            <div className="text-xs p-2">더이상 알림이 없어요 😛</div>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
