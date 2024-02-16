import { axiosInstance } from "@/utils/axios";

export const deleteCollection = async (dogamId: number) => {
  const res = await axiosInstance.delete(`/api/friends/dogam/${dogamId}`);
  console.log("service 도감삭제", res);
  return res;
};
