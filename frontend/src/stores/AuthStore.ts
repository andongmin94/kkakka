import { create } from "zustand";
import { AuthStoreType } from "@/types/storeTypes";

export const useAuthStore = create<AuthStoreType>((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
  logout: () => set({ token: null }),
}));
