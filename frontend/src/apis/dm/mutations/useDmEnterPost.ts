import { useMutation } from "@tanstack/react-query";
import { useDmStore } from "@/stores/DmStore";

const useDmEnterPost = ({ friendEmail }: { friendEmail: string }) => {
  const { enterDm } = useDmStore();

  return useMutation(() => enterDm(friendEmail), {
    onSuccess: () => {
      window.alert("채팅방에 입장했습니다.");
    },
    onError: (error: Error) => {
      window.alert(`채팅방 입장에 실패했습니다. ${error.message}`);
    },
  });
};

export default useDmEnterPost;
