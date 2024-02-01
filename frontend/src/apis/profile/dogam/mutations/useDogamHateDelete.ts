// /api/friends/dogam/hate/dogam-id
// 도감 싫어요 취소 하기

import { useMutation } from "@tanstack/react-query";
import { useProfileDogamStore } from "@/stores/ProfileStore";
import { useShallow } from "zustand/react/shallow";

const { unDislikeDogam } = useProfileDogamStore(
  useShallow((state) => ({
    unDislikeDogam: state.unDislikeDogam,
  }))
);

const useDogamHateDelete = () => {
  return useMutation(unDislikeDogam, {
    onSuccess: () => {
      console.log("새로운 채팅방 생성하기 성공");
    },
    onError: (error: any) => {
      console.error("새로운 채팅방 생성하기 실패", error);
    },
  });
};
export default useDogamHateDelete;
