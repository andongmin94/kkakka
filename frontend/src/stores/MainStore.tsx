import { create } from "zustand";
import axios from "axios";

// 메인페이지 정보 (포인트, 프로필사진, 라이브방송리스트, 새로올라온 도감리스트)
export const useMainStore = create((set) => ({
  mainInfos: [],
  fetchMainInfos: async () => {
    try {
      // const response = await axios.get(
      //   `/api/oauth/callback/kakao/token?code=${code}`
      // );
      const response = await axios.get(`http://localhost:3001/data`);
      set({ mainInfos: response.data });
    } catch (error) {
      console.error("Error fetching main infos", error);
    }
  },
}));

// 친구 목록
export const useFriendStore = create((set) => ({
  friends: [],
  fetchFriends: async () => {
    try {
      // const response = await axios.get("/api/friends");
      const response = await axios.get(`http://localhost:3001/data/`);
      set({ friends: response.data });
    } catch (error) {
      console.error("Error fetching friends", error);
    }
  },
}));

export const useAlarmStore = create((set) => ({
  alarms: [],

  // 알림 리스트 불러오기
  fetchAlarms: async () => {
    try {
      // const response = await axios.get("/api/alarm");
      const response = await axios.get(`http://localhost:3001/data/`);
      set({ alarms: response.data });
    } catch (error) {
      console.error("Error fetching alarms", error);
    }
  },

  // 알림 확인하기 (수정)
  checkAlarm: async (alarmId) => {
    const url = `/api/alarm/${alarmId}`;
    const dataToUpdate = { is_checked: true };

    try {
      const response = await axios.patch(url, dataToUpdate);
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("Error checking the alarm", error.message);
    }
  },
}));
