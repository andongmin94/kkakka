import { getIsFriend } from "@/services/profile/profileDataApi";
import { useQuery } from "@tanstack/react-query";

export const useFriendship = () => {
  const useFriendshipQuery = (userId: string) => {
    return useQuery({
      queryKey: ["isFriend", userId],
      queryFn: () => getIsFriend(userId),
    });
  };

  return { useFriendshipQuery };
};
