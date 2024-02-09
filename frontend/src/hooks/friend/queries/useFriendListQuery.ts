import { getFriendList } from "@/services/friend/friendsDataApi";
import { useQuery } from "@tanstack/react-query";

export const useFriendList = () => {
  const useFriendListQuery = () => {
    return useQuery({
      queryKey: ["friendList"],
      queryFn: () => getFriendList(),
    });
  };

  return { useFriendListQuery };
};
