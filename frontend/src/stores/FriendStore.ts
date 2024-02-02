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

  // 친구 상태 조회
  checkIsFriend: async (userEmail) => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/friends/${userEmail}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      console.log("서버 응답:", response.data);
    } catch (error: any) {
      console.error("Error checking whether friend or not", error.message);
    }
  },

  // 친구 추가 (요청)
  sendFriendRequest: async (userEmail) => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/friends/${userEmail}`;

    try {
      const response = await axios.post(url, null, {
        headers: {
          Authorization: token,
        },
      });
      console.log("서버 응답:", response.data);
    } catch (error: any) {
      console.error("Error sending friend request", error.message);
    }
  },
}));
