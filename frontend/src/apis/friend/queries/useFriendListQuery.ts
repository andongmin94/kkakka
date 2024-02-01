// /api/friends
// 친구 목록 확인

import { useQuery } from "@tanstack/react-query";
import { useFriendStore } from "@/stores/FriendStore";
import { useShallow } from "zustand/react/shallow";

const { friends, fetchFriends } = useFriendStore(
  useShallow((state) => ({
    friends: state.friends,
    fetchFriends: state.fetchFriends,
  }))
);

const useFriendListQuery = () => {
  useQuery(queryKeys.FRIENDS, () => fetchFriends());
};

export default useFriendListQuery;
