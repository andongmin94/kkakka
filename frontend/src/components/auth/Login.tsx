import { Button } from "@/components/ui/button";

export default function Login() {
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
  const loginHandler = () => {
    window.location.href = link;
  };
  return <Button onClick={loginHandler}>로그인</Button>;
}
