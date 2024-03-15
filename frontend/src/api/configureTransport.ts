import axios from "axios";
import { createMockAxiosAdapter } from "./mock/axiosAdapter";
import { isMockMode } from "@/runtime/mode";

let configured = false;

/**
 * 실행 모드에 맞게 Axios 전역 경계를 한 번만 초기화한다.
 *
 * Mock 모드에서는 네트워크 대신 메모리/localStorage 기반 adapter를 사용하고,
 * 두 모드 모두 저장된 JWT를 동일한 Authorization 헤더 규약으로 전달한다.
 */
export const configureTransport = () => {
  if (configured) return;
  configured = true;

  if (isMockMode) {
    axios.defaults.adapter = createMockAxiosAdapter();
  }

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.set("Authorization", token);
    return config;
  });
};
