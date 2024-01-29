import axios from "axios";

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_REST_API_KEY}`,
  });

  return axiosInstance;
};

const createAxiosSocketInstance = () => {
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SOCKET_SERVER_URL}`,
  });
  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();
export const axiosSocketInstance = createAxiosSocketInstance();
