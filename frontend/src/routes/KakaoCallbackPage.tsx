import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function KakaoCallbackPage() {
  const code = new URL(document.location.toString()).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    axios.post("/api/oauth/callback/kakao/token", { code }).then((res) => {
      console.log(res.data);

      localStorage.setItem("token", res.data.authorization);

      navigate("/");
    });
  }, []);

  return <div>로그인 중입니다...</div>;
}
