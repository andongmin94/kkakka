import * as React from "react";
import classes from "@/components/navbar/Alarm.module.css";
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
  const [position, setPosition] = React.useState("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={classes.alarm_image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30 text-center">
        <DropdownMenuLabel>알림</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          className="w-30"
          value={position}
          onValueChange={setPosition}
        >
          <DropdownMenuRadioItem value="top">알림 1</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">알림 2</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">알림 3</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
