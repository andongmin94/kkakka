import { create } from "zustand";
import axios from "axios";

export const useBroadcastStore = create((set) => ({
  broadcasts: [],

  // 라이브 방송 시작하기 (게임 시작시 자동 생성)
  startBroadcast: async (friendEmail) => {
    const url = `/api/friends/broadcast/create/${friendEmail}`;

    try {
      const response = await axios.post(url);
      console.log("서버 응답:", response.data);
    } catch (error) {
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
      const response = await axios.post(url, betData);
    } catch (error) {
      console.error("Error creating bet", error.message);
    }
  },
}));
