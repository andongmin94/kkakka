import axios from "axios";
import { create } from "zustand";
import { AuthStoreType } from "@/types/storeTypes";

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
          set((prev) => ({ ...prev, token: res.headers.authorization }));
          localStorage.setItem("token", res.headers.authorization);
        });
    } catch (error: any) {
      console.error("Error logging in", error.message);
    }
  },
  logout: () => {
    set((prev) => ({ ...prev, token: null })), localStorage.removeItem("token");
  },
}));
