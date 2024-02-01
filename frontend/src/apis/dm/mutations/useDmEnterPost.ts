import { useMutation } from "@tanstack/react-query";
import { useDmStore } from "@/stores/DmStore";
import { useShallow } from "zustand/react/shallow";

const { dmList, fetchDmList } = useDmStore(
  useShallow((state) => ({
    dmList: state.dmList,
    fetchDmList: state.fetchDmList,
  }))
);

const useDmEnterPost = () => {
  return useMutation(fetchDmList, {
    onSuccess: () => {
      console.log("새로운 채팅방 생성하기 성공");
    },
    onError: (error: any) => {
      console.error("새로운 채팅방 생성하기 실패", error);
    },
  });
};
export default useDmEnterPost;
