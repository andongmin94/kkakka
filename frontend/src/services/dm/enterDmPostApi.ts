import { axiosInstance } from "@/utils/axios";

export const enterDmPost = async (userId: string) => {
  const { data } = await axiosInstance.post(
    `/api/friends/dm/enter/${userId}`,
    {}
  );
  return data.data;
};
