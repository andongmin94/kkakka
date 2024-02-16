import { Button } from "@/components/ui/button";

export default function Login() {
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
  const loginHandler = () => {
    window.location.href = link;
  };
  return (
    <div
      className="h-screen w-full bg-[url('/image/loginBg.jpg')] flex justify-center items-center"
      style={{
        backgroundImage: `url(https://ssafys3.s3.ap-northeast-2.amazonaws.com/static/%EB%A1%A4+%EB%B0%B0%EA%B2%BD.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white h-[250px] w-[400px] rounded-xl flex flex-col items-center dark:bg-black ">
        <div className="flex flex-col items-center mt-10">
          <div className=" font-bold text-xl mb-20 dark:text-white">로그인</div>
          <Button
            onClick={loginHandler}
            className="bg-[url('/image/kakaoLogo.png')] bg-cover w-[210px] h-[50px] rounded-xl shadow-md lg:hover:scale-105 transition-transform ease-in-out duration-500"
          />
        </div>
      </div>
    </div>
  );
}
