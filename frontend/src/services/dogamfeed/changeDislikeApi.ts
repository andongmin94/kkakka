import { axiosInstance } from "@/utils/axios";

export const dislikeDogam = async (dogamId: number) => {
  const res = await axiosInstance.post(`/api/friends/dogam/hate/${dogamId}`);
  console.log("도감 싫다", res.data);
  return res.data;
};

export const cancelDislikeDogam = async (dogamId: number) => {
  const res = await axiosInstance.delete(`/api/friends/dogam/hate/${dogamId}`);
  console.log("도감이 싫지 않다", res.data);
  return res.data;
};
