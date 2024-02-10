import { checkAlarm } from "@/services/alarm/checkAlarmApi";
import { useMutation } from "@tanstack/react-query";

export const useCheckAlarm = () => {
  const checkAlarmMutation = useMutation({
    mutationFn: (alarmId: number) => checkAlarm(alarmId),
    onSuccess: (res) => {
      console.log("알람을 확인했다", res);
    },
  });

  return checkAlarmMutation;
};
