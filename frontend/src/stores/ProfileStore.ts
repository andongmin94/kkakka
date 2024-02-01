import { create } from "zustand";
import { profileDogamStoreType, aliasStoreType } from "@/types/storeTypes";
import axios from "axios";
const token = localStorage.getItem("token");

export const useProfileDogamStore = create<profileDogamStoreType>((set) => ({
  profileDogams: [],
  dogamDetail: {},
  addDogamStatus: "idle", // 'idle' | 'loading' | 'success' | 'error'
  deleteDogamStatus: "idle",
  errorMessage: "",

  // 해당 유저의 도감 리스트 확인하기
  fetchProfileDogams: async (userEmail) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/profile/dogam?email=${userEmail}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      set((prev) => ({
        ...prev,
        profileDogams: res.data.data.profileDogamList,
      }));
    } catch (error: any) {
      console.error("Error fetching profile", error);
    }
  },

  // 도감 디테일 (댓글)
  fetchDogamDetail: async (dogamId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/dogam/${dogamId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      set((prev) => ({ ...prev, dogamDetail: res.data.data.dogamDetail }));
    } catch (error: any) {
      console.error("Error fetching profile", error);
    }
  },

  // 친구의 도감 추가하기
  addDogam: async (formData, friendEmail) => {
    set({ addDogamStatus: "loading", errorMessage: "" });

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }api/friend/dogam?email=${friendEmail}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // 성공시 상태를 success로 변경
      if (response.status === 200) {
        set({ addDogamStatus: "success" });
      }
    } catch (error) {
      set({ addDogamStatus: "error", errorMessage: "" });
    }
  },

  // 도감 댓글 달기
  createComment: async (dogamId, comment) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/friends/dogam/comment/${dogamId}`,
        { comment },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("Error creating comment", error);
    }
  },

  // 도감 댓글 삭제
  deleteComment: async (commentId) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/friends/dogam/comment/${commentId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  },
}));

// 칭호 보관함
export const useAliasStore = create<aliasStoreType>((set) => ({
  aliases: [],
  addAliasStatus: "idle",
  errorMessage: "",
  // 유저의 불명예의 전당 확인
  fetchAliases: async (userEmail) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/profile/alias?email=${userEmail}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      set((prev) => ({ ...prev, aliases: res.data.data.aliasList }));
    } catch (error: any) {
      console.error("Error fetching aliases", error.message);
    }
  },
}));
