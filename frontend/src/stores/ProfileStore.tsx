import { create } from "zustand";
import axios from "axios";

export const useProfileDogamStore = create((set) => ({
  profileDogams: [],
  addDogamStatus: "idle", // 'idle' | 'loading' | 'success' | 'error'
  deleteDogamStatus: "idle",
  errorMessage: "",

  // 도감 리스트 확인하기
  fetchProfileDogams: async (friendEmail) => {
    try {
      const response = await axios.get(
        `/api/profile/dogam?email=${friendEmail}`
      );
      set({ profileDogams: response.data });
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  },

  // 도감 디테일 (댓글)
  fetchDogamDetail: async (dogamId) => {
    try {
      const response = await axios.get(`/api/friends/dogam/${dogamId}`);
      set({ dogamDetail: response.data });
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  },

  // 도감 추가하기
  addDogam: async (formData, access_token, friendEmail) => {
    set({ addDogamStatus: "loading", errorMessage: "" });

    try {
      const response = await axios.post(
        `api/friend/dogam?email=${friendEmail}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      // 성공시 상태를 success로 변경
      if (response.status === 200) {
        set({ addDogamStatus: "success" });
      }
    } catch (error) {
      set({ addDogamStatus: "error", errorMessage: error.message });
    }
  },

  // 도감 삭제권 구입시에 실행
  deleteDogam: async (dogamId) => {
    set({ deleteDogamStatus: "loading", errorMessage: "" });

    try {
      const response = await axios.delete(`api/friend/dogam/${dogamId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (error) {
      set({ deleteDogamStatus: "error", errorMessage: error.message });
    }
  },
}));

// 칭호 보관함
export const useAliasStore = create((set) => ({
  aliases: [],
  // 불명예의 전당 확인
  fetchAliases: async (friendEmail) => {
    try {
      const response = await axios.get(
        `/api/profile/alias?email=${friendEmail}`
      );
      set({ aliases: response.data });
    } catch (error) {
      console.error("Error fetching aliases", error);
    }
  },

  // 칭호 지정권 구입 시 실행
  addAlias: async (formData, access_token, friendEmail) => {
    set({ addAliasStatus: "loading", errorMessage: "" });

    try {
      const response = await axios.post(
        `api/friend/alias?email=${friendEmail}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      // 성공시 상태를 success로 변경
      if (response.status === 200) {
        set({ addAliasStatus: "success" });
      }
    } catch (error) {
      set({ addAliasStatus: "error", errorMessage: error.message });
    }
  },
}));
