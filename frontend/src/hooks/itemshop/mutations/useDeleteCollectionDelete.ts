import { deleteCollection } from "@/services/itemshop/deleteCollectionApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/store/user/userStore";

export const useDeleteCollectionDelete = () => {
  const queryClient = useQueryClient();
  const { userInfo } = useUserStore();

  const mutation = useMutation({
    mutationFn: (dogamId: number) => deleteCollection(dogamId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profileDogamFeed", userInfo.userId],
      });
      window.alert("도감이 삭제되었습니다.");
    },
    onError: () => {
      window.alert("도감 삭제에 실패했습니다.");
      console.error("도감 삭제 안됨");
    },
  });

  return mutation;
};
