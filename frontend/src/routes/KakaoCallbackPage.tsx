import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function KakaoCallbackPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code"); // 인가 코드

  useEffect(() => {
    if (code) {
      axios
        .get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/oauth/callback/kakao/token?code=${code}`
        )
        .then((res) => {
          localStorage.setItem("token", res.headers.authorization);
          navigate("/loginsuccess");
        })
        .catch((err) => {
          console.error("로그인 에러", err);
        });
    }
  });

  return <div>로그인 중입니다...</div>;
}
