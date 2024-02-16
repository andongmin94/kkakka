import { axiosInstance } from "@/utils/axios";

export const getAlarmList = async () => {
  const res = await axiosInstance.get("/api/alarm");
  const data = res.data.data;
  console.log("service 알람 정보", data);

  return data;
};
