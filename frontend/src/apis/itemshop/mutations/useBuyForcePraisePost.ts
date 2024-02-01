// /api/friends/compliment?email=osy9536@kakao.com
// 강제 칭찬권 구매하기
import { useMutation } from "@tanstack/react-query";
import { useItemshopStore } from "@/stores/ItemshopStore";
import { useShallow } from "zustand/react/shallow";

const { items, fetchItems } = useItemshopStore(
  useShallow((state) => ({
    items: state.items,
    fetchItems: state.fetchItems,
  }))
);

const useBuyForcePraisePost = () => {
  return useMutation(fetchDmList, {
    onSuccess: () => {
      console.log("새로운 채팅방 생성하기 성공");
    },
    onError: (error: any) => {
      console.error("새로운 채팅방 생성하기 실패", error);
    },
  });
};
export default useBuyForcePraisePost;
