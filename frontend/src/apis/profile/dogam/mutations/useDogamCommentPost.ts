// /api/friends/dogam/comment/dogam-id
// 도감 코멘트 작성

import { useMutation } from "@tanstack/react-query";
import { useProfileDogamStore } from "@/stores/ProfileStore";
import { useShallow } from "zustand/react/shallow";

const { addDogamComment } = useProfileDogamStore(
  useShallow((state) => ({
    addDogamComment: state.addDogamComment,
  }))
);

const useDogamCommentPost = () => {
  return useMutation(addDogamComment, {
    onSuccess: () => {
      console.log("새로운 채팅방 생성하기 성공");
    },
    onError: (error: any) => {
      console.error("새로운 채팅방 생성하기 실패", error);
    },
  });
};
export default useDogamCommentPost;
