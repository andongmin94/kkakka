import Login from "@/components/auth/Login";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const token = localStorage.getItem("token");
  if (token) {
    window.alert("이미 로그인되어 있습니다");
    const navigate = useNavigate();
    navigate("/main");
  }

  return (
    <div>
      <Login />
    </div>
  );
}
