// /api/friends/dogam?email=osy9536@kakao.com
// 도감 추가하기

import { useMutation } from "@tanstack/react-query";
import { useProfileDogamStore } from "@/stores/ProfileStore";
import { useShallow } from "zustand/react/shallow";

const { addDogam } = useProfileDogamStore(
  useShallow((state) => ({
    addDogam: state.addDogam,
  }))
);

const useDogamAddPost = () => {
  return useMutation(addDogam, {
    onSuccess: () => {
      console.log("새로운 채팅방 생성하기 성공");
    },
    onError: (error: any) => {
      console.error("새로운 채팅방 생성하기 실패", error);
    },
  });
};
export default useDogamAddPost;
