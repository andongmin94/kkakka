import { create } from "zustand";
import axios from "axios";
import { itemshopStoreType } from "@/types/storeTypes";

const token = localStorage.getItem("token");

export const useItemshopStore = create<itemshopStoreType>((set) => ({
  items: [],
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
    } catch (error: any) {
      console.error("Error fetching items", error.message);
    }
  },
}));
