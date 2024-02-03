import { useQuery } from "@tanstack/react-query";
import { ALARM_SUBSCRIBE } from "@/constants/queryKeys";
import { useAlarmStore } from "@/stores/AlarmStore";

const useAlarmSubscribeQuery = () => {
  const { subscribeAlarm } = useAlarmStore();

  const {
    data: newAlarms,
    error,
    isLoading,
  } = useQuery({
    queryKey: [ALARM_SUBSCRIBE],
    queryFn: subscribeAlarm,
  });

  return { newAlarms, error, isLoading };
};

export default useAlarmSubscribeQuery;
