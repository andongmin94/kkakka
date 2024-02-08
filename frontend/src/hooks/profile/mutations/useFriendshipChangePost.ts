import { frinedshipChangePost } from "@/services/profile/friendshipChangePostApi";
import { useMutation } from "@tanstack/react-query";

export const useFriendshipChangePost = () => {
  const mutation = useMutation({
    mutationFn: (userId: string) => frinedshipChangePost(userId),
  });

  return mutation;
};
