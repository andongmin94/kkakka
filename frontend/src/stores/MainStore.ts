import { create } from "zustand";
import {
  mainStoreType,
  friendStoreType,
  alarmStoreType,
} from "@/types/storeTypes";
import axios from "axios";

const token = localStorage.getItem("token");

// 메인페이지 정보 (포인트, 프로필사진, 라이브방송리스트, 새로올라온 도감리스트)
export const useMainStore = create<mainStoreType>((set) => ({
  myPoint: 0,
  myProfilePic: "",
  liveBroadcastList: [],
  newDogamList: [],
  fetchMyPoint: async () => {
    try {
      // const response = await axios.get(
      //   `/api/oauth/callback/kakao/token?code=${code}`
      // );
      const response = await axios.get(`http://localhost:3001/data`, {
        headers: {
          Authorization: token,
        },
      });
      set({ myPoint: response.data.point });
    } catch (error: any) {
      console.error("Error fetching my point", error.message);
    }
  },

  fetchMyProfilePic: async () => {
    try {
      // const response = await axios.get(
      //   `/api/oauth/callback/kakao/token?code=${code}`
      // );
      const response = await axios.get(`http://localhost:3001/data`, {
        headers: {
          Authorization: token,
        },
      });
      set({ myProfilePic: response.data.profilePic });
    } catch (error: any) {
      console.error("Error fetching my profile pic", error.message);
    }
  },

  fetchLiveBroadcastList: async () => {
    try {
      // const response = await axios.get(
      //   `/api/oauth/callback/kakao/token?code=${code}`
      // );
      const response = await axios.get(`http://localhost:3001/data`, {
        headers: {
          Authorization: token,
        },
      });
      set({ liveBroadcastList: response.data.liveBroadcastList });
    } catch (error: any) {
      console.error("Error fetching live broadcast list", error.message);
    }
  },

  fetchNewDogamList: async () => {
    try {
      // const response = await axios.get(
      //   `/api/oauth/callback/kakao/token?code=${code}`
      // );
      const response = await axios.get(`http://localhost:3001/data`, {
        headers: {
          Authorization: token,
        },
      });
      set({ newDogamList: response.data.newDogamList });
    } catch (error: any) {
      console.error("Error fetching new dogam list", error.message);
    }
  },
}));

// 친구 목록
export const useFriendStore = create<friendStoreType>((set) => ({
  friends: [],
  fetchFriends: async () => {
    try {
      // const response = await axios.get("/api/friends");
      const response = await axios.get(`http://localhost:3001/data/`, {
        headers: {
          Authorization: token,
        },
      });
      set({ friends: response.data });
    } catch (error: any) {
      console.error("Error fetching friends", error.message);
    }
  },
}));

export const useAlarmStore = create<alarmStoreType>((set) => ({
  alarms: [],
  // 알림 리스트 불러오기
  fetchAlarms: async () => {
    try {
      // const response = await axios.get("/api/alarm");
      const response = await axios.get(`http://localhost:3001/data/`, {
        headers: {
          Authorization: token,
        },
      });
      set({ alarms: response.data });
    } catch (error: any) {
      console.error("Error fetching alarms", error.message);
    }
  },

  // 알림 확인하기 (수정)
  checkAlarm: async (alarmId) => {
    const url = `/api/alarm/${alarmId}`;
    const dataToUpdate = { is_checked: true };

    try {
      const response = await axios.patch(url, dataToUpdate, {
        headers: {
          Authorization: token,
        },
      });
      console.log("서버 응답:", response.data);
    } catch (error: any) {
      console.error("Error checking the alarm", error.message);
    }
  },
}));
