import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/AuthStore";

export default function KakaoCallbackPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code"); // 인가 코드
  // const code = new URL(document.location.toString()).searchParams.get("code"); // 인가 코드
  // console.log(code);
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  useEffect(() => {
    setToken(code!);
    navigate("/main");
  }, []);

  return <div>로그인 중입니다...</div>;
}
