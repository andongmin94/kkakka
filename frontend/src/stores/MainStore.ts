import axios from "axios";
import { create } from "zustand";
import { mainStoreType } from "@/types/storeTypes";

const token = localStorage.getItem("token");

// 메인페이지 정보
export const useMainStore = create<mainStoreType>((set) => ({
  myPoint: 0,
  userData: {
    userName: "",
    userEmail: "",
    userProfileImg: "",
    userBackImg: "",
    userAlias: "",
    userId: 0,
    bankruptcy: false,
  },
  fetchMyPoint: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/point`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("서버 응답 point", response.data.point);
      set((prev) => ({ ...prev, myPoint: response.data.point }));
      return response.data.point;
    } catch (error: any) {
      console.error("Error fetching my point", error.message);
    }
  },

  // 본인 정보
  fetchMyData: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/data`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("서버 응답 유저데이터", response.data.data);
      set((prev) => ({ ...prev, userData: response.data.data }));
      return response.data.data;
    } catch (error: any) {
      console.error("Error fetching my datas", error.message);
    }
  },
}));
