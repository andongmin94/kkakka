import { axiosInstance } from "@/utils/axios";

export const checkAlarm = async (alarmId: number) => {
  const res = await axiosInstance.put(`/api/alarm/${alarmId}`, {});
  return res;
};
