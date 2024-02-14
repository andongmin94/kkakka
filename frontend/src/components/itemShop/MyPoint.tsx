import { useEffect, useState } from "react";
import axios from "axios";

export default function MyPoint() {
  const [point, setPoint] = useState<number>(0);

  useEffect(() => {
    if (!point) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/point`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("포인트", res.data.data.Point);
          setPoint(res.data.data.Point);
        });
    }
  }, [point]);

  return (
    <div className="flex justify-between mr-0 mb-2">
      <div></div>
      <div className="flex bg-slate-300 rounded-md  bg-opacity-50 px-6 py-2 mb-6 items-center">
        <div className="mr-3">💰</div>
        <div className="flex flex-col">
          <div className="mr-3">내 포인트</div>
          <div>{point}</div>
        </div>
      </div>
    </div>
  );
}
