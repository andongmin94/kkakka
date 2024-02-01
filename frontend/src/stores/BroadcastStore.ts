import { create } from "zustand";
import { broadcastStoreType } from "@/types/storeTypes";
import axios from "axios";
const token = localStorage.getItem("token");

export const useBroadcastStore = create<broadcastStoreType>((set) => ({
  createBetStatus: "idle", // 'idle' | 'loading' | 'success' | 'error'
  errorMessage: "",
  liveBroadcastList: [],
  fetchLiveBroadcastList: async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/friends/broadcast`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      set((prev) => ({
        ...prev,
        liveBroadcastList: response.data.liveBroadcastList,
      }));
    } catch (error: any) {
      console.error("Error fetching live broadcast list", error.message);
    }
  },

  // 라이브 방송 시작하기 (게임 시작시 자동 생성)
  startBroadcast: async (friendEmail) => {
    const url = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/friends/broadcast/enter/${friendEmail}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      console.log("서버 응답:", response.data);
    } catch (error: any) {
      console.error("Error starting a new broadcast", error.message);
    }
  },

  // 배팅하기
  createBet: async (roomId, curBettingPoint, isWin) => {
    set((prev) => ({ ...prev, createBetStatus: "loading", errorMessage: "" }));
    try {
      const betData = {
        roomId,
        curBettingPoint,
        isWin,
      };
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/betting/{roomid}`;
      await axios.post(url, betData, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      console.error("Error creating bet", error.message);
    }
  },

  // 배팅 정산받기
  settleBet: async (roomId) => {
    set((prev) => ({ ...prev, createBetStatus: "loading", errorMessage: "" }));
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/betting/${roomId}`;
      await axios.post(url, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      console.error("Error settling bet", error.message);
    }
  },
}));
