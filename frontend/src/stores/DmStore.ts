import axios from "axios";
import { create } from "zustand";
import { dmStoreType } from "@/types/storeTypes";

const token = localStorage.getItem("token");
// 1대1 채팅방 목록
export const useDmStore = create<dmStoreType>((set) => ({
  dmList: [],
  prevChat: [],
  fetchDmList: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/dm`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("서버 응답 dm:", res.data.data);
      set((prev) => ({ ...prev, dmList: res.data.data.dmList }));
      return res.data.data.dmList;
    } catch (error) {
      console.error("Error fetching direct messages", error);
    }
  },

  // 채팅방 입장하기
  enterDm: async (friendEmail) => {
    const url = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/friends/dm/enter/${friendEmail}`;

    try {
      const response = await axios.post(url, {
        headers: {
          Authorization: token,
        },
      });
      console.log("서버 응답 방 들어가기:", response.data);
    } catch (error) {
      console.error("Error entering a direct message", error);
    }
  },

  // 채팅방 삭제하기 (완전히 나가기)
  deleteDm: async (friendEmail) => {
    const url = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/friends/dm/delete?email=${friendEmail}`;

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: token,
        },
      });
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("Error deleting a direct message", error);
    }
  },

  // 채팅방 이전 내용
  loadPrevChat: async (dmId) => {
    const url = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/firends/dm/load/${dmId}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      set((prev) => ({ ...prev, prevChat: response.data.data.prevChat }));
    } catch (error) {
      console.error("Error loading previous chat", error);
    }
  },
}));
