import { create } from "zustand";
import { friendStoreType } from "@/types/storeTypes";
import axios from "axios";

const token = localStorage.getItem("token");
// 친구 목록
export const useFriendStore = create<friendStoreType>((set) => ({
  friends: [],
  fetchFriends: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      set((prev) => ({ ...prev, friends: res.data.data.friendList }));
    } catch (error: any) {
      console.error("Error fetching friends", error.message);
    }
  },
}));
