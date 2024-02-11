import { useState, useEffect } from "react";
import classes from "@/components/navbar/Alarm.module.css";
import { useTheme } from "@/components/navbar/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useAlarmList } from "@/hooks/alarm/queries/useAlarmListQuery";
import useAlarmStore from "@/store/alarm/alarmStore";
import { useCheckAlarm } from "@/hooks/alarm/mutations/useCheckAlarmPut";
import axios from "axios";

export function Alarm() {
  const { theme } = useTheme();
  const [position, setPosition] = useState("");

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

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {theme === "light" ? (
            <div className={classes.alarm_image} />
          ) : (
            <div className={classes.alarm_image_dark} />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30 text-center">
          <DropdownMenuLabel>
            {numOfUncheckedAlarm}개의 알림이 있습니다.
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            className="w-30"
            value={position}
            onValueChange={setPosition}
          >
            {alarmList &&
              alarmList.map((alarm) => {
                return (
                  <DropdownMenuRadioItem
                    value="top"
                    key={alarm.alarmId}
                    onClick={() => {
                      checkAlarmHandler(alarm.alarmId);
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <div>
                        <img
                          src={alarm.alarmPic}
                          alt="alarm-pic"
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                      <div>{alarm.alarmContent}</div>
                      <div>
                        {alarm.createdAt.toString().substring(5, 7)}월{" "}
                        {alarm.createdAt.toString().substring(8, 10)}일
                      </div>
                    </div>
                  </DropdownMenuRadioItem>
                );
              })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// const {
//   alarmList,
//   numOfUncheckedAlarm,
//   setAlarmList,
//   setNumOfUncheckedAlarm,
// } = useAlarmStore();

// const { useAlarmListQuery } = useAlarmList();
// const { data: alarmData } = useAlarmListQuery();

// useEffect(() => {
//   if (alarmData) {
//     setAlarmList(alarmData.alarmList);
//     setNumOfUncheckedAlarm(alarmData.numOfUncheckedAlarm);
//   }
// }, [alarmData, setAlarmList, setNumOfUncheckedAlarm]);
