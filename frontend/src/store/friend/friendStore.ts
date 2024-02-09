import { create } from "zustand";
import { FriendType } from "@/types/friendTypes";

interface friendStoreType {
  friendList: FriendType[];
  setFriendList: (newFriendList: FriendType[]) => void;
}

const useFriendStore = create<friendStoreType>((set) => ({
  friendList: [],
  setFriendList: (newFriendList) => set({ friendList: newFriendList }),
}));

export default useFriendStore;
