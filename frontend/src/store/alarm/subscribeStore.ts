import { create } from "zustand";

interface AlarmSubscribeStoreType {
  lastEventId: string;
  setLastEventId: (lastEventId: string) => void;
}

const useAlarmSubscribeStore = create<AlarmSubscribeStoreType>((set) => ({
  lastEventId: "",
  setLastEventId: (newLastEventId) => set({ lastEventId: newLastEventId }),
}));

export default useAlarmSubscribeStore;
