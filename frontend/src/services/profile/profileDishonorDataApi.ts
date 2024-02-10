import { axiosInstance } from "@/utils/axios";

export const getDishonorList = async (userId: string) => {
  const res = await axiosInstance.get(`/api/profile/alias?user-id=${userId}`);
  const data = res.data.data.aliasList;
  return data;
};
