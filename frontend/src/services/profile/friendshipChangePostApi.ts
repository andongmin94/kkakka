import { axiosInstance } from "@/utils/axios";

export const frinedshipChangePost = async (userId: string) => {
  const res = await axiosInstance.post(`/api/friends/${userId}`, {});
  console.log(res);
  return res.data;
};
