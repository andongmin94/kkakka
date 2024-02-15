import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAlarmStore from "@/store/alarm/alarmStore";
import axios from "axios";

export default function LoginSuccessPage() {
  const navigate = useNavigate();
  const gotoMainHandler = () => {
    navigate("/main");
  };

  const { setAlarmList, setNumOfUncheckedAlarm } = useAlarmStore();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/alarm`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setAlarmList(res.data.data.alarmList);
        setNumOfUncheckedAlarm(res.data.data.numOfUncheckedAlarm);
      });
  }, []);

  return (
    <>
      <div
        className="h-screen w-full flex justify-center items-center"
        style={{
          backgroundImage: `url(https://ssafys3.s3.ap-northeast-2.amazonaws.com/static/%EB%A1%A4+%EB%B0%B0%EA%B2%BD.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <div className=" bg-white h-[250px] w-[400px]  rounded-xl flex flex-col items-center dark:bg-black ">
          <div className="flex flex-col items-center mt-10">
            <div className=" font-bold text-xl mb-20 dark:text-white">
              반갑습니다, 또 와주셨군요!
            </div>
            <Button
              onClick={gotoMainHandler}
              className="bg-blue-400 text-white text-md shadow-md lg:hover:scale-105 transition-transform ease-in-out duration-500"
            >
              친구 놀리러 가기 😜
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
