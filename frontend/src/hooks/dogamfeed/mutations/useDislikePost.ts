import { dislikeDogam } from "@/services/dogamfeed/changeDislikeApi";
import { useMutation } from "@tanstack/react-query";

export const useDislikeDogam = () => {
  const dislikeDogamMutation = useMutation({
    mutationFn: (alarmId: number) => checkAlarm(alarmId),
    onSuccess: (res) => {
      console.log("알람을 확인했다", res);
    },
  });

  return checkAlarmMutation;
};
