import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginSuccessPage() {
  const navigate = useNavigate();
  const skipHandler = () => {
    const isSkipping = window.confirm(
      "건너뛰겠습니까? 내 프로필 > 프로필 편집에서 재설정이 가능합니다."
    );
    if (isSkipping) {
      navigate("/main");
    } else {
      return;
    }
  };

  const setLolId = (e: any) => {
    e.preventDefault();
    const lolId = e.target.value;
    console.log(lolId);
    const token = localStorage.getItem("token");
    axios
      .put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/profile-edit`,
        {
          lolId: lolId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        window.alert("롤 아이디가 저장되었습니다.");
        navigate("/main");
      });
  };

  return (
    <>
      <div>롤 아이디를 입력하세요</div>
      <form action="">
        <input type="text" />
        <Button onClick={setLolId}>저장 </Button>
        <Button onClick={skipHandler}>건너뛰기</Button>
      </form>
    </>
  );
}
