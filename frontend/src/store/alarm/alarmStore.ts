import { create } from "zustand";
import { AlarmType } from "@/types/alarmTypes";

interface alarmStoreType {
  alarmList: AlarmType[];
  numOfUncheckedAlarm: number;
  lastNotiEventId: string;
  setAlarmList: (newAlarmList: AlarmType[]) => void;
  setNumOfUncheckedAlarm: (num: number) => void;
  setLastNotiEventId: (eventId: string) => void;
}

const useAlarmStore = create<alarmStoreType>((set) => ({
  alarmList: [],
  numOfUncheckedAlarm: 0,
  lastNotiEventId: "",
  setAlarmList: (newAlarmList) => set({ alarmList: newAlarmList }),
  setNumOfUncheckedAlarm: (num) => set({ numOfUncheckedAlarm: num }),
  setLastNotiEventId: (eventId) => set({ lastNotiEventId: eventId }),
}));

export default useAlarmStore;
