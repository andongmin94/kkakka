import { getAlarmList } from "@/services/alarm/alarmDataApi";
import { useQuery } from "@tanstack/react-query";

export const useAlarmList = () => {
  const useAlarmListQuery = () => {
    return useQuery({
      queryKey: ["alarmList"],
      queryFn: () => getAlarmList(),
    });
  };

  return { useAlarmListQuery };
};
