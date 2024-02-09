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
import axios from "axios";
import { AlarmType } from "@/types/alarmTypes";

export function Alarm() {
  const { theme } = useTheme();
  const [position, setPosition] = useState("");
  const token = localStorage.getItem("token");

  const [alarms, setAlarms] = useState<{
    alarmList: AlarmType[];
    numOfUncheckedAlarm: number;
  } | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/alarm`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setAlarms(res.data.data);
      });
  }, []);

  const alarmList = alarms && alarms.alarmList;
  const numOfUncheckedAlarm = alarms && alarms.numOfUncheckedAlarm;

  const checkAlarm = (alarmId: number) => {
    axios
      .put(
        `${import.meta.env.VITE_API_BASE_URL}/api/alarm/${alarmId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
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
                    checkAlarm(alarm.alarmId);
                  }}
                >
                  {alarm.alarmPic}
                  {alarm.alarmContent}
                  {alarm.createdAt.toString()}
                </DropdownMenuRadioItem>
              );
            })}

          <DropdownMenuRadioItem value="top">알림 1</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">알림 2</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">알림 3</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
