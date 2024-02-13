import Login from "@/components/auth/Login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      window.alert("이미 로그인되어 있습니다");
      navigate("/main");
    }
  });

  return (
    <div>
      <Login />
    </div>
  );
}
