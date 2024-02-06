import { axiosUsersInstance } from "@/utils/users/axios";
const electron = window.electron;

export const getUserData = async () => {
  const res = await axiosUsersInstance.get("/data");
  const data = res.data.data;
  typeof electron !== "undefined" && electron.send("userInfo", data.userId);
  typeof electron !== "undefined" &&
    electron.send("token", localStorage.getItem("token"));

  return data;
};
