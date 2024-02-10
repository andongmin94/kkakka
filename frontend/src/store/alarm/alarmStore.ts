import { create } from "zustand";
import { AlarmType } from "@/types/alarmTypes";

interface alarmStoreType {
  alarmList: AlarmType[];
  numOfUncheckedAlarm: number;
  setAlarmList: (newAlarmList: AlarmType[]) => void;
  setNumOfUncheckedAlarm: (num: number) => void;
}

const useAlarmStore = create<alarmStoreType>((set) => ({
  alarmList: [],
  numOfUncheckedAlarm: 0,
  setAlarmList: (newAlarmList) => set({ alarmList: newAlarmList }),
  setNumOfUncheckedAlarm: (num) => set({ numOfUncheckedAlarm: num }),
}));

export default useAlarmStore;
