import axios from "axios";

const createAxiosInstance = () => {
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/users`,
    headers: { Authorization: token },
  });

  return axiosInstance;
};

export const axiosUsersInstance = createAxiosInstance();
