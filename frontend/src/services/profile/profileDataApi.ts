import { axiosInstance } from "@/utils/axios";

export const getProfile = async (userId: string) => {
  const { data } = await axiosInstance.get(`/api/users/data/${userId}`);
  return data.data;
};

export const getIsFriend = async (userId: string) => {
  const { data } = await axiosInstance.get(`/api/friends/${userId}`);
  console.log("service친구상태조회", data.data.state);
  return data.data.state;
};
