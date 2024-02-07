import { create } from "zustand";

interface PointStoreType {
  point: number;
  setPoint: (newPoint: number) => void;
}

const usePointStore = create<PointStoreType>((set) => ({
  point: 0,
  setPoint: (newPoint) => set({ point: newPoint }),
}));

export default usePointStore;
