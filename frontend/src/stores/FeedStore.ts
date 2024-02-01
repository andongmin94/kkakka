import { create } from "zustand";
import { FeedStoreType } from "@/types/storeTypes";
import axios from "axios";

const token = localStorage.getItem("token");

export const useFeedStore = create<FeedStoreType>((set) => ({
  newDogamList: [],
  fetchNewDogamList: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/dogam`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      set((prev) => ({ ...prev, newDogamList: response.data.newDogamList }));
    } catch (error: any) {
      console.error("Error fetching new dogam list", error.message);
    }
  },

  // 도감 싫어요
  disLikeDogam: async (dogamId) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/friends/dogam/hate/${dogamId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error: any) {
      console.error("Error disliking a dogam", error.message);
    }
  },

  // 도감 싫어요 취소
  unDislikeDogam: async (dogamId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/friends/dogam/hate/${dogamId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error: any) {
      console.error("Error undisliking a dogam", error.message);
    }
  },
}));
