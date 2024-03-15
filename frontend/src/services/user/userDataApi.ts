import { axiosInstance } from "@/utils/axios";

export const getUserData = async () => {
  const res = await axiosInstance.get("/api/users/data");
  const data = res.data.data;

  return data;
};

export const updateUserData = async ({ data }: any) => {
  const formData = new FormData();
  if (data.riotId) {
    formData.append("riotId", data.riotId);
  }
  if (data.profileImg) {
    formData.append("profileImg", data.profileImg);
  }
  if (data.backImg) {
    formData.append("backImg", data.backImg);
  }

  const res = await axiosInstance.put("/api/users/profile-edit", formData);

  return res;
};
