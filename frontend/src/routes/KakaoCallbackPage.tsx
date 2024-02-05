import { useEffect } from "react";
import { useAuthStore } from "@/stores/AuthStore";
import { useNavigate, useLocation } from "react-router-dom";

export default function KakaoCallbackPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code"); // 인가 코드

  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  useEffect(() => {
    setToken(code!);
    navigate("/loginsuccess");
  }, []);

  return <div>로그인 중입니다...</div>;
}
