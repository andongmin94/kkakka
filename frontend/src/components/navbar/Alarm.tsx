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
import { useAlarmList } from "@/hooks/alarm/queries/useAlarmListQuery";
import useAlarmStore from "@/store/alarm/alarmStore";
import { useCheckAlarm } from "@/hooks/alarm/mutations/useCheckAlarmPut";

export function Alarm() {
  const { theme } = useTheme();
  const [position, setPosition] = useState("");

  const {
    alarmList,
    numOfUncheckedAlarm,
    setAlarmList,
    setNumOfUncheckedAlarm,
  } = useAlarmStore();

  const { useAlarmListQuery } = useAlarmList();
  const { data: alarmData } = useAlarmListQuery();

  useEffect(() => {
    if (alarmData) {
      setAlarmList(alarmData.alarmList);
      setNumOfUncheckedAlarm(alarmData.numOfUncheckedAlarm);
    }
  }, [alarmData, setAlarmList, setNumOfUncheckedAlarm]);

  const checkAlarmMutation = useCheckAlarm();
  const { mutate } = checkAlarmMutation;

  const checkAlarmHandler = (alarmId: number) => {
    mutate(alarmId);
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
                    checkAlarmHandler(alarm.alarmId);
                  }}
                >
                  {/*  이거 사진으로 어떻게 만드는지 모르겠음  */}
                  {alarm.alarmPic}
                  {alarm.alarmContent}
                  {alarm.createdAt.toString()}
                </DropdownMenuRadioItem>
              );
            })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
