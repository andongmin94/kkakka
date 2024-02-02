import * as React from "react";
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

export function Alarm() {
  const { theme } = useTheme();
  const [position, setPosition] = React.useState("");

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
          {/* {alarms.uncheckedAlarms}개의 알림이 있습니다. */}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          className="w-30"
          value={position}
          onValueChange={setPosition}
        >
          {/* {alarms.alarmList &&
            alarms.alarmList.map((alarm, idx) => {
              return (
                <DropdownMenuRadioItem
                  value="top"
                  onClick={() => {
                    checkAlarm(alarm.alarmId);
                  }}
                >
                  {alarm.alarmPic}
                  {alarm.alarmContent}
                  {alarm.createdAt}
                </DropdownMenuRadioItem>
              );
            })} */}

          {/* <DropdownMenuRadioItem value="top">알림 1</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">알림 2</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">알림 3</DropdownMenuRadioItem> */}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
