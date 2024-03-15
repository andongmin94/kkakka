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
      if (inputValue.length >= 2) {
        mutate({ data: { riotId: inputValue } });
        setUserInfo({ ...userInfo, riotId: inputValue });
        window.alert("롤 아이디가 저장되었습니다.");
        navigate("/main");
      } else {
        window.alert("두 글자 이상 입력해주세요.");
      }
    } catch (error) {
      console.log(error);
      window.alert("롤 아이디 저장에 실패했습니다.");
    }
  };

  return (
    <>
      <div
        className="h-screen w-full flex flex-col justify-center items-center "
        style={{
          backgroundImage: "url(/image/loginBg.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-white h-[250px] w-[400px] rounded-xl flex flex-col items-center ">
          <div className="flex flex-col items-center mt-8">
            <div className=" font-bold text-md mb-8 flex items-center flex-col">
              <div className="mb-2">환영합니다🤩</div>
              <div>시작하기 위해 롤 아이디를 입력해주세요.</div>
            </div>
            <form action="">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="mt-5 flex justify-center gap-3">
                <Button
                  onClick={setLolId}
                  className="lg:hover:scale-105 transition-transform ease-in-out duration-500 bg-blue-400"
                >
                  저장하기
                </Button>
                <Button
                  onClick={skipHandler}
                  className="bg-white text-black border-[1px] lg:hover:scale-105 hover:bg-gray-200 transition-transform ease-in-out duration-500"
                >
                  건너뛰기
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
