import { Button } from "@/components/ui/button";
import { startLogin } from "@/auth/authClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const loginHandler = async () => {
    try {
      const nextPath = await startLogin();
      if (nextPath) navigate(nextPath);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "로그인을 시작할 수 없습니다.");
    }
  };
  return (
    <div
      className="h-screen w-full bg-[url('/image/loginBg.jpg')] flex justify-center items-center"
      style={{
        backgroundImage: "url(/image/loginBg.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white/95 min-h-[280px] w-[400px] rounded-xl flex flex-col items-center justify-center px-10 shadow-2xl dark:bg-black/95">
        <div className="flex flex-col items-center w-full">
          <img src="/image/logo.png" alt="까까" className="h-16 object-contain mb-5" />
          <div className="font-bold text-lg mb-3 dark:text-white">
            친구의 게임을 함께 보고 이야기해보세요
          </div>
          <p className="text-sm text-slate-500 mb-8 text-center">
            라이브 채팅부터 도감, 승패 예측과 아이템까지 한 흐름으로 이어집니다.
          </p>
          <Button
            onClick={loginHandler}
            className="bg-yellow-300 text-slate-900 hover:bg-yellow-400 w-[210px] h-[50px] rounded-xl shadow-md lg:hover:scale-105 transition-transform ease-in-out duration-500"
          >
            까까 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}
