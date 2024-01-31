import { Button } from "@/components/ui/button";

export default function Login() {
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
  const loginHandler = () => {
    window.location.href = link;
  };
  return (
    <div className="h-screen w-full bg-[url('/image/loginBg.jpg')] bg-cover flex justify-center items-center">
      <div className="bg-white h-[300px] w-[500px] rounded-xl flex flex-col items-center lg:hover:scale-105 transition-transform ease-in-out duration-500">
        <div className="flex flex-col items-center mt-10">
          <div className=" font-bold text-3xl mb-20">로그인</div>
          <Button
            onClick={loginHandler}
            className="bg-[url('/image/kakaoLogo.png')] bg-cover h-[70px] w-[300px] rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
