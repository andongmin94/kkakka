import { create } from "zustand";
import axios from "axios";
import { dmStoreType } from "@/types/storeTypes";

// 1대1 채팅방 목록
export const useDmStore = create<dmStoreType>((set) => ({
  dmList: [],
  fetchDmList: async () => {
    try {
      // const response = await axios.get("/api/friends/dm");
      const response = await axios.get(`http://localhost:3001/data/`);
      set({ dmList: response.data });
    } catch (error) {
      console.error("Error fetching direct messages", error);
    }
  },

  // 새로운 채팅방 생성하기 -> 이미 있으면 기존 채팅방으로 이동.
  startDm: async (friendEmail) => {
    const url = `/api/friends/dm/create/${friendEmail}`;

    try {
      const response = await axios.post(url);
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("Error starting a new direct message", error);
    }
  },

  // 기존 채팅방 입장하기
  enterDm: async (friendEmail) => {
    const url = `/api/friends/dm/enter/${friendEmail}`;

    try {
      const response = await axios.post(url);
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("Error entering a direct message", error);
    }
  },

  // 채팅방 삭제하기 (완전히 나가기)
  deleteDm: async (friendEmail) => {
    const url = `/api/friends/dm/delete?email=${friendEmail}`;

    try {
      const response = await axios.delete(url);
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("Error deleting a direct message", error);
    }
  },

  // 채팅방 외출하기 (마지막 확인 시간 수정)
  outingDm: async (dmId) => {
    const url = `/api/friends/dm/outing/${dmId}`;
    const dataToUpdate = { checked_at: new Date() };

    try {
      const response = await axios.patch(url, dataToUpdate);
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("Error checking the alarm", error);
    }
  },
}));
