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
          `${import.meta.env.VITE_API_BASE_URL}${
            import.meta.env.VITE_API_BASE_NEXT_URL
          }=${code}`
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

  return (
    <div
      className="h-screen w-full flex justify-center items-center"
      style={{
        backgroundImage: `url(https://ssafys3.s3.ap-northeast-2.amazonaws.com/static/%EB%A1%A4+%EB%B0%B0%EA%B2%BD.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <div className=" bg-white h-[250px] w-[400px]  rounded-xl flex flex-col items-center justify-center dark:bg-black ">
        <div className="font-bold text-xl">
          <div>로그인 중입니다...</div>
        </div>
      </div>
    </div>
  );
}
