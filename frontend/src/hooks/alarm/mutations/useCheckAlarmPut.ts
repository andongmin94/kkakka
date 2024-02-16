import { checkAlarm } from "@/services/alarm/checkAlarmApi";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export const useCheckAlarm = () => {
  const queryClient = useQueryClient();
  const checkAlarmMutation = useMutation({
    mutationFn: (alarmId: number) => checkAlarm(alarmId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["alarmList"],
        refetchType: "active",
      });
      console.log("알람을 확인했다", res);
    },
  });

  return checkAlarmMutation;
};
