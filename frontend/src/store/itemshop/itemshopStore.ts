import { create } from "zustand";
import { ItemType } from "@/types/itemTypes";
interface itemshopStoreType {
  itemList: ItemType[];
  setItemList: (newItemList: ItemType[]) => void;
}

const useItemshopStore = create<itemshopStoreType>((set) => ({
  itemList: [],
  setItemList: (newItemList) => set({ itemList: newItemList }),
}));

export default useItemshopStore;
