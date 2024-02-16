import { create } from "zustand";
import { AliasType } from "@/types/aliasTypes";
interface dishonorStoreType {
  aliases: AliasType[];
  setAliases: (newAliases: AliasType[]) => void;
}

const useDishonorStore = create<dishonorStoreType>((set) => ({
  aliases: [],
  setAliases: (newAliases) => set({ aliases: newAliases }),
}));

export default useDishonorStore;
