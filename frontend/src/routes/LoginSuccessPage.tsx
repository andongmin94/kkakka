import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
// const electron = window.electron;

export default function LoginSuccessPage() {
  const navigate = useNavigate();
  const gotoMainHandler = () => {
    navigate("/main");
  };

  return (
    <>
      <div>친구 놀리러 가기</div>
      <Button onClick={gotoMainHandler}>까까</Button>
    </>
  );
}
