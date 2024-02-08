import { axiosInstance } from "@/utils/axios";

export const getItemList = async () => {
  const res = await axiosInstance.get("/api/itemshop");
  const data = res.data.data.itemList;

  return data;
};
