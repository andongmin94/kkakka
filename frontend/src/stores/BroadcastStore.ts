import axios from "axios";
import { create } from "zustand";
import { broadcastStoreType } from "@/types/storeTypes";

const token = localStorage.getItem("token");

export const useBroadcastStore = create<broadcastStoreType>((set) => ({
  createBetStatus: "idle", // 'idle' | 'loading' | 'success' | 'error'
  errorMessage: "",
  liveBroadcastList: [],
  fetchLiveBroadcastList: async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/friends/broadcasts`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      set((prev) => ({
        ...prev,
        liveBroadcastList: response.data.data,
      }));
      return response.data.data;
    } catch (error: any) {
      console.error("Error fetching live broadcast list", error.message);
    }
  },

  // 라이브 방송 시작하기 (게임 시작시 자동 생성)
  /*
  김상훈 리뷰 (내용 이해하고나면 삭제하셈) 2024.02.05
  axios 사용하실 때 매개변수로 (url, data, headers) 순서로 넣어야 합니다.
  지금 두번째 인자, 즉 data 부분에 헤더가 들어있어서 함수 돌려보시면 오류가 발생할겁니다.
  딱히 데이터가 필요없는 경우에는 빈 객체를 넣어주셔야 합니다.
  즉 바른 표기법은 axios.get(url, {}, { headers: {...} }) 이렇게 되겠습니다.
  그리고 방 생성하는거라 get이 아니라 post로 보내주셔야 합니다.
  다음으로 url 부분이 API 명세에는 broadcasts라고 되어있는데 여기에는 broadcast라 되있어요.
  훈수둘려는건 아니고, 제가 돌려보다가 안되길래 확인해보고 작성합니다.
  명시한 두 개만 고치고 돌려봤는데 잘 동작하네요. 잘하셨습니다.
  그냥 사소한 휴먼에러때문에 고생하시는거 같아서
  결코 본인이 뭘 잘못 이해했다거나 그런게 아니라는걸 알려드리고 싶어요.
  */
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
