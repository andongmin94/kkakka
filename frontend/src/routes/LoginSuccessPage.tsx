import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
// const electron = window.electron;
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
      <div className="h-screen w-full bg-[url('/image/loginBg.jpg')] bg-cover flex justify-center items-center">
        <div className="bg-white h-[200px] w-[400px] rounded-xl flex flex-col items-center lg:hover:scale-105 transition-transform ease-in-out duration-500">
          <div className="flex flex-col items-center mt-10">
            <div className=" font-bold text-3xl mb-10">친구 놀리러 가기</div>
            <Button onClick={gotoMainHandler} className=" text-xl">
              까까
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
