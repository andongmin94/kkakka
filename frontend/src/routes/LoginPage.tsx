import Login from "@/components/auth/Login";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const token = localStorage.getItem("token");
  if (!token) {
    const navigate = useNavigate();
    navigate("/login");
  }
  return (
    <div>
      <Login />
    </div>
  );
}
