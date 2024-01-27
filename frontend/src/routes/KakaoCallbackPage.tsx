import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function KakaoCallbackPage() {
  const code = new URL(document.location.toString()).searchParams.get("code"); // 인가 코드
  const navigate = useNavigate();

  useEffect(() => {
    axios.post("/api/oauth/callback/kakao/token", { code }).then((res) => {
      // 콜백에 인가 코드 보내줌
      console.log(res.data);

      localStorage.setItem("token", res.data.authorization); // 토큰 받아오면 authorization 가져와서 로컬스토리지에 저장

      navigate("/"); // 메인으로 이동
    });
  }, []);

  return <div>로그인 중입니다...</div>;
}
