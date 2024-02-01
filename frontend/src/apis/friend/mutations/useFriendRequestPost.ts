// /api/friends?email=osy9536@kakao.com
// 친구 추가하기

// 미완성 다시 작업하기

import { useMutation } from "@tanstack/react-query";
import { useFriendStore } from "@/stores/FriendStore";
import { useShallow } from "zustand/react/shallow";

const {} = useDmStore(
  useShallow((state) => ({
    dmList: state.dmList,
    fetchDmList: state.fetchDmList,
  }))
);

const useFriendRequestPost = () => {
  return useMutation(fetchDmList, {
    onSuccess: () => {
      console.log("새로운 채팅방 생성하기 성공");
    },
    onError: (error: any) => {
      console.error("새로운 채팅방 생성하기 실패", error);
    },
  });
};
export default useFriendRequestPost;
