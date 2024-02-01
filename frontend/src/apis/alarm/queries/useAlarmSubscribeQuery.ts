// /api/alarm/subscribe
// 알람 SSE 구독하기
// import { useQuery } from "@tanstack/react-query";
// import { useAlarmStore } from "@/stores/AlarmStore";
// import { useShallow } from "zustand/react/shallow";

// const { alarms, fetchAlarms } = useAlarmStore(
//   useShallow((state) => ({
//     alarms: state.alarms,
//     fetchAlarms: state.fetchAlarms,
//   }))
// );

// const useAlarmListQuery = () => {
//   return useQuery(queryKeys.ALARM, () => fetchAlarms());
// };

// export default useAlarmListQuery;
