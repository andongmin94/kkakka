// /api/alarm/
// 알람 리스트 불러오기

import { useQuery } from "@tanstack/react-query";
import { useAlarmStore } from "@/stores/AlarmStore";
import { useShallow } from "zustand/react/shallow";

const { alarms, fetchAlarms } = useAlarmStore(
  useShallow((state) => ({
    alarms: state.alarms,
    fetchAlarms: state.fetchAlarms,
  }))
);

const useAlarmListQuery = () => {
  return useQuery(queryKeys, () => fetchAlarms());
};

export default useAlarmListQuery;
