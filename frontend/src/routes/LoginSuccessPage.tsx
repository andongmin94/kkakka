import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/user/userStore";
import { useRef } from "react";
import { useUserDataPut } from "@/hooks/user/mutations/useUserDataPut";
const electron = window.electron;

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

  const { userInfo, setUserInfo } = useUserStore();
  const mutation = useUserDataPut();
  const { mutate } = mutation;
  const lolId = useRef();

  const setLolId = (e: any) => {
    e.preventDefault();
    try {
      console.log(lolId.current.value);
      mutate({ data: { riotId: lolId.current.value } });
      setUserInfo({ ...userInfo, riotId: lolId.current.value });
      navigate("/main");
    } catch (error) {
      console.log(error);
      window.alert("롤 아이디 저장에 실패했습니다.");
    }
  };

  return (
    <>
    <br /><br /><br /><br /><br />
      <div>롤 아이디를 입력하세요</div>
      <form action="">
        <input type="text" ref={lolId} />
        <Button onClick={setLolId}>저장 </Button>
        <Button onClick={skipHandler}>건너뛰기</Button>
      </form>
    </>
  );
}
