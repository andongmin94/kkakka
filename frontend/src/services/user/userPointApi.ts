import { axiosInstance } from "@/utils/axios";

export const getUserPoint = async () => {
  const res = await axiosInstance.get("/api/users/point");
  console.log("포인트 조회하기", res.data.data.Point);
  const data = res.data.data.Point;

  return data;
};
