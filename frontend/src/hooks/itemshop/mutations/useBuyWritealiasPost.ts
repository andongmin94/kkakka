import { buyWriteAlias } from "@/services/itemshop/buyWriteAliasApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface receiverType {
  userId: number;
  textAlias: string;
  name: string;
}

export const useBuyWriteAliasPost = (receiver: receiverType) => {
  const queryClient = useQueryClient();
  const userId = receiver.userId;

  const mutation = useMutation({
    mutationFn: (receiver) => buyWriteAlias(receiver),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendAlias", userId] });
      window.alert("친구의 칭호가 변경되었습니다.");
    },
    onError: () => {
      window.alert("칭호 변경에 실패했습니다.");
      console.error("칭호 변경 안되지롱");
    },
  });

  return mutation;
};
