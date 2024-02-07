import { axiosUsersInstance } from "@/utils/axios";
const electron = window.electron;

export const getUserData = async () => {
  const res = await axiosUsersInstance.get("/api/users/data");
  const data = res.data.data;
  typeof electron !== "undefined" && electron.send("userInfo", data);
  typeof electron !== "undefined" &&
    electron.send("token", localStorage.getItem("token"));

  return data;
};
