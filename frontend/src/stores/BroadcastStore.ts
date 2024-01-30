import { create } from "zustand";
import { broadcastStoreType } from "@/types/storeTypes";
import { axiosInstance } from "@/utils/axios";

const token = localStorage.getItem("token");

export const useBroadcastStore = create<broadcastStoreType>((set) => ({
  broadcasts: [],
  createBetStatus: "idle", // 'idle' | 'loading' | 'success' | 'error'
  errorMessage: "",
  // 라이브 방송 시작하기 (게임 시작시 자동 생성)
  startBroadcast: async (friendEmail) => {
    const url = `/api/friends/broadcast/create/${friendEmail}`;

    try {
      const response = await axiosInstance.post(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("서버 응답:", response.data);
    } catch (error: any) {
      console.error("Error starting a new broadcast", error.message);
    }
  },

  // 게임 끝난 방 삭제하기 (게임 종료 0시간 후 삭제?) -- 논의 필요

  // 배팅하기
  createBet: async (roomId, previousBetAmount, betAmount, winOrLose) => {
    set({ createBetStatus: "loading", errorMessage: "" });
    try {
      const betData = {
        roomId,
        previousBetAmount,
        betAmount,
        winOrLose,
      };
      const url = `/api/friends/broadcast/${roomId}/betting`;
      await axiosInstance.post(url, betData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      console.error("Error creating bet", error.message);
    }
  },
}));
