import { axiosInstance } from "@/utils/axios";

export const enterDmPost = async (userId: string) => {
  const { data } = await axiosInstance.post(
    `/api/friends/dm/enter/${userId}`,
    {}
  );
  console.log(data.data);
  return data;
};
