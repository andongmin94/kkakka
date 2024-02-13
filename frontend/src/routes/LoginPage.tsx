import Login from "@/components/auth/Login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/main");
    }
  });

  return (
    <div>
      <Login />
    </div>
  );
}
