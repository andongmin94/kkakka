import { axiosInstance } from "@/utils/axios";

export const buyWriteAlias = async (data: any) => {
  const formData = new FormData();
  formData.append("aliasName", data.textAlias);

  const res = await axiosInstance.post(
    `/api/friends/alias?receiver-id=${data.userId}`,
    formData
  );

  console.log("service 칭호변경", res);
  return res;
};
