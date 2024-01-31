import { create } from "zustand";
import axios from "axios";
import { itemshopStoreType } from "@/types/storeTypes";

const token = localStorage.getItem("token");

export const useItemshopStore = create<itemshopStoreType>((set) => ({
  items: [],
  fetchItems: async () => {
    try {
      await axios
        .get("/api/itemshop", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          set({ items: res.data });
        });
    } catch (error: any) {
      console.error("Error fetching items", error.message);
    }
  },
}));
