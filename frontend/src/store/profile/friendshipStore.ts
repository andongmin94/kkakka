import { create } from "zustand";

interface friendshipStoreType {
  friendship: "FRIEND" | "RECEIVE" | "SEND" | "NONE";
  setFriendship: (
    newFriendState: "FRIEND" | "RECEIVE" | "SEND" | "NONE"
  ) => void;
}

const useFriendshipStore = create<friendshipStoreType>((set) => ({
  friendship: "NONE",
  setFriendship: (newFriendShip) => set({ friendship: newFriendShip }),
}));

export default useFriendshipStore;
