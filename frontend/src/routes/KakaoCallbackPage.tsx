import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/AuthStore";

export default function KakaoCallbackPage() {
  const code = new URL(document.location.toString()).searchParams.get("code"); // 인가 코드
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  useEffect(() => {
    setToken(code!);
    navigate("/");
  }, []);

  return <div>로그인 중입니다...</div>;
}
