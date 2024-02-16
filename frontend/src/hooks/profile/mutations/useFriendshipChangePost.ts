import { friendshipChangePost } from "@/services/profile/friendshipChangePostApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useProfileStore from "@/store/profile/profileStore";

export const useFriendshipChangePost = () => {
  const queryClient = useQueryClient();
  const { profileInfo } = useProfileStore();
  const userId = profileInfo.userId;

  const mutation = useMutation({
    mutationFn: (userId: string) => friendshipChangePost(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isFriend", userId] });
      window.alert("저장되었습니다.");
    },
    onError: () => {
      window.alert("오류가 발생했습니다.");
      console.error("안되지롱");
    },
  });

  return mutation;
};
