import { useState } from "react";
import axios from "axios";

export default function ThumbsDown({
  tD,
  dogamId,
}: {
  tD: boolean;
  dogamId: number;
}) {
  const token = localStorage.getItem("token");
  const [thumbs, setThumbs] = useState(tD);

  const hateClickHandler = async () => {
    try {
      // setThumbs를 호출한 후 thumbs 상태가 변경되었을 때를 기다립니다.
      await setThumbs(!thumbs);

      const res = thumbs
        ? await axios.delete(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/friends/dogam/hate/${dogamId}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
        : await axios.post(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/friends/dogam/hate/${dogamId}`,
            {},
            {
              headers: {
                Authorization: token,
              },
            }
          );

      console.log("hateClickHandler", res);
    } catch (error) {
      console.error("Error in hateClickHandler:", error);
    }
  };

  return (
    <div
      className="h-[50px] w-[50px] ml-2 grid grid-col place-items-center"
      onClick={() => {
        setThumbs(!thumbs);
        hateClickHandler();
        // !tD;
      }}
    >
      {thumbs ? (
        <img src="/image/thumbsDownOn.png" className="w-8 h-8" />
      ) : (
        <img src="/image/thumbsDown.png" className="w-8 h-8" />
      )}
    </div>
  );
}
