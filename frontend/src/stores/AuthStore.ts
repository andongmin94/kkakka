import { create } from "zustand";
import { AuthStoreType } from "@/types/storeTypes";
// import { axiosInstance } from "@/utils/axios";
import axios from "axios";

export const useAuthStore = create<AuthStoreType>((set) => ({
  token: null,
  setToken: async (code: string) => {
    try {
      await axios
        .get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/oauth/callback/kakao/token?code=${code}`
        )
        .then((res) => {
          set({ token: res.headers.authorization });
          localStorage.setItem("token", res.headers.authorization);
        });
    } catch (error: any) {
      console.error("Error logging in", error.message);
    }
  },
  logout: () => {
    set({ token: null }), localStorage.removeItem("token");
  },
}));
