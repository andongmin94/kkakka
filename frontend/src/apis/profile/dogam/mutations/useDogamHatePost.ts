// /api/friends/dogam/hate/dogam-id
// 도감 싫어요 하기

import { useMutation } from "@tanstack/react-query";
import { useProfileDogamStore } from "@/stores/ProfileStore";
import { useShallow } from "zustand/react/shallow";

const { dislikeDogam } = useProfileDogamStore(
  useShallow((state) => ({
    dislikeDogam: state.dislikeDogam,
  }))
);

const useDogamHatePost = () => {
  return useMutation(dislikeDogam, {
    onSuccess: () => {
      console.log("새로운 채팅방 생성하기 성공");
    },
    onError: (error: any) => {
      console.error("새로운 채팅방 생성하기 실패", error);
    },
  });
};
export default useDogamHatePost;
