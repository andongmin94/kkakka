import { useState } from "react";
import axios from "axios";

export default function ThumbsDown({
  tD,
  dogamId,
  dogamDislikeNum,
  setDogamDislikeNum,
}: {
  tD: boolean;
  dogamId: number;
  dogamDislikeNum: number;
  setDogamDislikeNum: Function;
}) {
  const token = localStorage.getItem("token");
  const [thumbs, setThumbs] = useState(tD);

  const hateClickHandler = async () => {
    try {
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

      // API 호출 후 숫자 업데이트
      setDogamDislikeNum(thumbs ? dogamDislikeNum - 1 : dogamDislikeNum + 1);
    } catch (error) {
      console.error("Error in hateClickHandler:", error);
    }
  };

  return (
    <div
      className="h-[50px] w-[50px] grid grid-col place-items-center"
      onClick={() => {
        setThumbs(!thumbs);
        hateClickHandler();
      }}
    >
      {thumbs ? (
        <img
          src="/image/thumbsDownOn.png"
          className="w-6 h-6"
          alt="싫어요 활성화"
        />
      ) : (
        <img
          src="/image/thumbsDown.png"
          className="w-6 h-6"
          alt="싫어요 비활성화"
        />
      )}
    </div>
  );
}
