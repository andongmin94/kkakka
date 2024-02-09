import { axiosInstance } from "@/utils/axios";

export const getBroadcastList = async () => {
  const res = await axiosInstance.get("/api/friends/broadcasts");
  const data = res.data.data;
  console.log("service 방송목록", data);

  return data;
};
