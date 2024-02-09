import { axiosInstance } from "@/utils/axios";

export const getFriendList = async () => {
  const res = await axiosInstance.get("/api/friends");
  const data = res.data.data.friendList;
  console.log("service 친구목록", data);

  return data;
};
