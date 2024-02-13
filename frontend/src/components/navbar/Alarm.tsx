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

  const checkAlarmHandler = (alarmId: number) => {
    mutate(alarmId);
  };

  const {
    alarmList,
    numOfUncheckedAlarm,
    setAlarmList,
    setNumOfUncheckedAlarm,
  } = useAlarmStore();

  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("userEmail");

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
        setNumOfUncheckedAlarm(res.data.data.numOfUncheckedAlarm);
      })
      .catch((err) => {
        console.error("알람 정보를 가져오는데 실패했습니다.", err);
      });
  }, []);

  const moveToAlarmContentHandler = (alarm: AlarmType) => {
    if (alarm.frqEmail !== userEmail) {
      navigate(`/main/profile/${userId}`);
    }
    // else {
    //   navigate(`/main/profile/${alarm.relatedContentId}`);
    // }
  };

  return (
    <div>
      <DropdownMenu>
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
            className="w-30"
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
