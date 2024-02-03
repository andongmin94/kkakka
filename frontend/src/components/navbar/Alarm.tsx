import { useState } from "react";
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
// import useAlarmSubscribeQuery from "@/apis/alarm/queries/useAlarmSubscribeQuery";
import useAlarmListQuery from "@/apis/alarm/queries/useAlarmListQuery";

export function Alarm() {
  const { theme } = useTheme();
  const [position, setPosition] = useState("");

  // const { newAlarms, isLoading, error } = useAlarmSubscribeQuery();
  const { alarms, isLoading, error } = useAlarmListQuery();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.{error.message}</div>;

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
          {alarms && alarms.numOfUncheckedAlarm}개의 알림이 있습니다.
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          className="w-30"
          value={position}
          onValueChange={setPosition}
        >
          {alarms &&
            alarms.alarmList &&
            alarms.alarmList.map((alarm, idx) => {
              return (
                <DropdownMenuRadioItem
                  value="top"
                  // onClick={() => {
                  //   checkAlarm(alarm.alarmId); 이거 뮤테이션써서불러오기
                  // }}
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
