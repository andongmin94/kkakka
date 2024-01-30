import { create } from "zustand";
import axios from "axios";
import { itemshopStoreType } from "@/types/storeTypes";

const token = localStorage.getItem("token");

export const useItemshopStore = create<itemshopStoreType>((set) => ({
  items: [],
  fetchItems: async () => {
    try {
      // const response = await axios.get("/api/");
      const response = await axios.get(`http://localhost:3001/data/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ items: response.data });
    } catch (error: any) {
      console.error("Error fetching items", error.message);
    }
  },
}));
