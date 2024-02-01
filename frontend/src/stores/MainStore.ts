import { create } from "zustand";
import { mainStoreType } from "@/types/storeTypes";
import axios from "axios";

const token = localStorage.getItem("token");

// 메인페이지 정보 (포인트, 프로필사진, 라이브방송리스트, 새로올라온 도감리스트) api 경로 수정하기
export const useMainStore = create<mainStoreType>((set) => ({
  myPoint: 0,
  myEmail: "",
  myProfilePic: "",
  fetchMyPoint: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/point`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      set((prev) => ({ ...prev, myPoint: response.data.point }));
    } catch (error: any) {
      console.error("Error fetching my point", error.message);
    }
  },

  // 본인 이메일, 프로필 사진 불러오기
  fetchMyProfilePic: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/email`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      set((prev) => ({ ...prev, myProfilePic: response.data.profilePic }));
      set((prev) => ({ ...prev, myEmail: response.data.email }));
    } catch (error: any) {
      console.error("Error fetching my profile pic", error.message);
    }
  },
}));
