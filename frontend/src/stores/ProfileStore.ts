import axios from "axios";
import { create } from "zustand";
import {
  profileDogamStoreType,
  aliasStoreType,
  profileStoreType,
} from "@/types/storeTypes";

const token = localStorage.getItem("token");

// 프로필 들어가면 나오는 정보
export const useProfileStore = create<profileStoreType>((set) => ({
  profile: {
    userName: "",
    userEmail: "",
    userProfileImg: "",
    userBackImg: "",
    userAlias: "",
    userId: 0,
    bankruptcy: false,
  },
  fetchProfile: async (userId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/data/${userId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("서버응답 프로필 정보", res.data.data);
      set({ profile: res.data.data });
      return res.data.data;
    } catch (error: any) {
      console.error("Error fetching profile", error.message);
    }
  },
}));

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
      console.log("프로필 도감 리스트", res.data);
      set((prev) => ({
        ...prev,
        profileDogams: res.data.data,
      }));
      return res.data;
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
      console.log("도감 디테일:", res.data);
      set((prev) => ({ ...prev, dogamDetail: res.data.data.dogamDetail }));
      return res.data.data;
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
      console.log("서버응답 칭호 리스트", res.data.data.aliasList);
      set((prev) => ({ ...prev, aliases: res.data.data.aliasList }));
      return res.data.data.aliasList;
    } catch (error: any) {
      console.error("Error fetching aliases", error.message);
    }
  },
}));
