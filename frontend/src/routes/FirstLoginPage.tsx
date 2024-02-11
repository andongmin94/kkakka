import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/user/userStore";
import { useState, useEffect } from "react";
import { useUserDataPut } from "@/hooks/user/mutations/useUserDataPut";
// const electron = window.electron;
import { useUserData } from "@/hooks/user/queries/useUserDataQuery";
import { Input } from "@/components/ui/input";

export default function FirstLoginPage() {
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
  const { useUserDataQuery } = useUserData();
  const { data: userData } = useUserDataQuery();

  useEffect(() => {
    if (userData) {
      setUserInfo(userData);
    } else {
      console.log("유저 정보 없음");
    }
  }, [userData]);

  const mutation = useUserDataPut();
  const { mutate } = mutation;

  const [inputValue, setInputValue] = useState("");

  const setLolId = (e: any) => {
    e.preventDefault();
    try {
      console.log(inputValue);
      mutate({ data: { riotId: inputValue } });
      setUserInfo({ ...userInfo, riotId: inputValue });
      window.alert("롤 아이디가 저장되었습니다.");
      navigate("/main");
    } catch (error) {
      console.log(error);
      window.alert("롤 아이디 저장에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="h-screen w-full bg-[url('/image/loginBg.jpg')] bg-cover flex justify-center items-center">
        <div className="bg-white h-[300px] w-[500px] rounded-xl flex flex-col items-center lg:hover:scale-105 transition-transform ease-in-out duration-500">
          <div className="flex flex-col items-center mt-10">
            <div className=" font-bold text-3xl mb-20">
              롤 아이디를 입력하세요
            </div>
            <form action="">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="mt-5 flex justify-center gap-3">
                <Button onClick={setLolId}>저장 </Button>
                <Button onClick={skipHandler}>건너뛰기</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
