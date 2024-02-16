import { create } from "zustand";
import { BroadcastItemType } from "@/types/broadcastTypes";
interface broadcastStoreType {
  broadcastList: BroadcastItemType[];
  setBroadcastList: (newBroadcastList: BroadcastItemType[]) => void;
}

const useBroadcastStore = create<broadcastStoreType>((set) => ({
  broadcastList: [],
  setBroadcastList: (newBroadcastList) =>
    set({ broadcastList: newBroadcastList }),
}));

export default useBroadcastStore;
