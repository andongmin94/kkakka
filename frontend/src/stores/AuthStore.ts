import { create } from "zustand";
import { AuthStoreType } from "@/types/storeTypes";
import { axiosInstance } from "@/utils/axios";

export const useAuthStore = create<AuthStoreType>((set) => ({
  token: null,
  setToken: async (code: string) => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_KAKAO_REDIRECT_URI}?code=${code}`
      );
      console.log(response.data);
      set({ token: response.headers.Authorization });
      localStorage.setItem("token", response.headers.Authorization);
    } catch (error: any) {
      console.error("Error getting token", error.message);
    }
  },

  logout: () => set({ token: null }),
}));
