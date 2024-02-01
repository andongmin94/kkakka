// /api/alarm/알림 고유값
// 알림 확인하기

import { useMutation } from "@tanstack/react-query";
import { useAlarmStore } from "@/stores/AlarmStore";
import { useShallow } from "zustand/react/shallow";

const { checkAlarm } = useAlarmStore(
  useShallow((state) => ({
    checkAlarm: state.checkAlarm,
  }))
);

const useAlarmCheckPut = () => {
  return useMutation(checkAlarm, {
    onSuccess: () => {
      console.log("알림 확인 완료");
    },
    onError: (error: any) => {
      console.log("알림 확인 실패", error);
    },
  });
};

export default useAlarmCheckPut;
