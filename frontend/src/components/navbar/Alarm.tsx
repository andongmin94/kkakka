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
import { useEffect } from "react";
import { useAlarmStore } from "@/stores/MainStore";

export function Alarm() {
  const [position, setPosition] = React.useState("");
  const { fetchAlarms, alarms, checkAlarm } = useAlarmStore();

  useEffect(() => {
    fetchAlarms();
  }, [fetchAlarms]);

  console.log(alarms.alarmList); // 알림내용 리스트
  console.log(alarms.uncheckedAlarms); // 읽지않은 알림 갯수

  // 데이터 예시
  // {
  //   "data": {
  //     "alarmList": [
  //       {
  //         "alarmID": 1,
  //         "alarmContent": "배성규님이 친구 요청을 보냈습니다.",
  //         "alarmPic": "배성규프사",
  //         "isChecked": false,
  //         "createdAt": "2018-01-01 00:00:00",
  // 				"frqEmail": "요청보낸사람@naver.com" | null,
  // 				"dogamId" : 123123 | null
  //       },
  //       {
  //         "alarmID": 2,
  //         "alarmContent": "새로운 도감이 추가되었습니다.",
  //         "alarmPic": "내프사",
  //         "isChecked": false,
  //         "createdAt": "2018-01-01 00:00:00",
  // 				"frqEmail": "요청보낸사람@naver.com" | null,
  // 				"dogamId" : 123123 | null
  //       }
  //     ],
  //     "uncheckedAlarms": 10
  //   },
  //   "msg": "방 목록 생성 성공"
  // }

  // 1. frq 이메일이 있는 경우(친구신청) - 그 이메일 프로필로 redirect
  // 2. dogamId가 있는 경우(새댓글, 새도감) - 내 프로필로 redirect
  // 3. 둘 다 없는 경우(칭호변경) - 내 프로필로 redirect

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={classes.alarm_image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30 text-center">
        <DropdownMenuLabel>
          {alarms.uncheckedAlarms}개의 알림이 있습니다.
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          className="w-30"
          value={position}
          onValueChange={setPosition}
        >
          {alarms.alarmList &&
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
            })}

          {/* <DropdownMenuRadioItem value="top">알림 1</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">알림 2</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">알림 3</DropdownMenuRadioItem> */}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
