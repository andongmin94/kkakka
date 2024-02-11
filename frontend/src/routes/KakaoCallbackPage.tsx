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
          }/api/oauth/callback/kakao/token/l-t-l?code=${code}`
        )
        .then((res) => {
          localStorage.setItem("token", res.headers.authorization);
          console.log(res.data.data.isFirst);
          if (res.data.data.isFirst) {
            navigate("/first-login");
          } else {
            navigate("/login-success");
          }
        })
        .catch((err) => {
          console.error("로그인 에러", err);
        });
    }
  });

  return <div>로그인 중입니다...</div>;
}
