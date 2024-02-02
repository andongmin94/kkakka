import { useQuery } from "@tanstack/react-query";
import { FRIEND_LIST } from "@/constants/queryKeys";
import { useFriendStore } from "@/stores/FriendStore";

const useFriendListQuery = () => {
  const { fetchFriends } = useFriendStore();

  const {
    data: friends,
    error,
    isLoading,
  } = useQuery({
    queryKey: [FRIEND_LIST],
    queryFn: fetchFriends,
  });

  return { friends, error, isLoading };
};

export default useFriendListQuery;
