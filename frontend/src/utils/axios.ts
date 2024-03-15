import axios from "axios";

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.set("Authorization", token);
    return config;
  });

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();
