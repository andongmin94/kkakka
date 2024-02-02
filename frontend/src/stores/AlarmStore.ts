import { create } from "zustand";
import { alarmStoreType } from "@/types/storeTypes";
import axios from "axios";

const token = localStorage.getItem("token");
export const useAlarmStore = create<alarmStoreType>((set) => ({
  alarms: [],
  // 알림 리스트 불러오기
  fetchAlarms: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/alarm`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      set((prev) => ({ ...prev, alarms: res.data.data.alarmList }));
    } catch (error: any) {
      console.error("Error fetching alarms", error.message);
    }
  },

  // 알람 SSE 구독
  subscribeAlarm: async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/alarm/subscribe`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      console.log("서버 응답:", response.data);
    } catch (error: any) {
      console.error("Error subscribing alarms", error.message);
    }
  },

  // 개별 알림 확인하기
  checkAlarm: async (alarmId) => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/alarm/${alarmId}`;
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

  // 새 알람 확인 (종누르기)
  checkNewAlarms: async (lastEventId) => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/alarm/`;
    const dataToUpdate = {
      lastEventId,
    };

    try {
      const response = await axios.patch(url, dataToUpdate, {
        headers: {
          Authorization: token,
        },
      });
      console.log("서버 응답:", response.data);
    } catch (error: any) {
      console.error("Error checking new alarms", error.message);
    }
  },
}));
