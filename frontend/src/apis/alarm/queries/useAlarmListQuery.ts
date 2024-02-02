import { useQuery } from "@tanstack/react-query";
import { ALARM_LIST } from "@/constants/queryKeys";
import { useAlarmStore } from "@/stores/AlarmStore";

const useAlarmListQuery = () => {
  const { fetchAlarms } = useAlarmStore();

  const {
    data: alarms,
    error,
    isLoading,
  } = useQuery({
    queryKey: [ALARM_LIST],
    queryFn: fetchAlarms,
  });

  return { alarms, error, isLoading };
};

export default useAlarmListQuery;
