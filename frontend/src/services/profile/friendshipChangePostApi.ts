import { axiosInstance } from "@/utils/axios";
import useFriendshipStore from "@/store/profile/friendshipStore";

export const friendshipChangePost = async (userId: string) => {
  const { setFriendship } = useFriendshipStore();
  const res = await axiosInstance.post(`/api/friends/${userId}`, {});
  setFriendship(res.data);
  return res.data;
};
