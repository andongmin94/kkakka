// /api/friends/dogam/dogam-id
// 도감 삭제하기 아이템발동

import { useMutation } from "@tanstack/react-query";
import { useItemshopStore } from "@/stores/ItemshopStore";
import { useShallow } from "zustand/react/shallow";

const { ,  } = useItemshopStore(
  useShallow((state) => ({
    items: state.items,
    fetchItems: state.fetchItems,
  }))
);

const useDogamDelete = () => {
  return useMutation(fetchDmList, {
    onSuccess: () => {
      console.log("새로운 채팅방 생성하기 성공");
    },
    onError: (error: any) => {
      console.error("새로운 채팅방 생성하기 실패", error);
    },
  });
};
export default useDogamDelete;