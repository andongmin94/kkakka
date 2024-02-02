import axios from "axios";
import { create } from "zustand";
import { itemshopStoreType } from "@/types/storeTypes";

const token = localStorage.getItem("token");

export const useItemshopStore = create<itemshopStoreType>((set) => ({
  items: [],
  addAliasStatus: "idle",
  deleteDogamStatus: "idle",
  errorMessage: "",
  fetchItems: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/itemshop`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      set((prev) => ({ ...prev, items: res.data.data.itemList }));
      return res.data.data.itemList;
    } catch (error: any) {
      console.error("Error fetching items", error.message);
    }
  },

  // 도감 삭제권 구입시에 실행
  deleteDogam: async (dogamId) => {
    set({ deleteDogamStatus: "loading", errorMessage: "" });

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}api/friend/dogam/${dogamId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error: any) {
      set({ deleteDogamStatus: "error", errorMessage: error.message });
    }
  },

  // 칭호 지정권 구입 시
  addAlias: async (formData, friendEmail) => {
    set({ addAliasStatus: "loading", errorMessage: "" });

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/friend/alias?email=${friendEmail}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // 성공시 상태를 success로 변경
      if (response.status === 200) {
        set({ addAliasStatus: "success" });
      }
    } catch (error: any) {
      set({ addAliasStatus: "error", errorMessage: error.message });
    }
  },

  // 강제 칭찬권 구매
  buyForcePraise: async (friendEmail) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/friends/compliment?${friendEmail}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("서버 응답:", response.data);
    } catch (error: any) {
      console.error("Error buying a force praise", error);
    }
  },

  // 확성기 구매
  buyMegaphone: async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/megaphone`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("서버 응답:", response.data);
    } catch (error: any) {
      console.error("Error buying a megaphone", error);
    }
  },
}));
