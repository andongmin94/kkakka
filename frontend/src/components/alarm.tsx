import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import classes from "@/components/alarm.module.css";

export default function Alarm() {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <div className={classes.alarm_image} />
        </HoverCardTrigger>
        <HoverCardContent>
          <p>알람1</p>
          <p>알람2</p>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
