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

  const hateClickHandler = (dogamId: number) => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/dogam/hate/${dogamId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  const hateCancelHandler = (dogamId: number) => {
    axios
      .delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/dogam/hate/${dogamId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  const [thumbs, setThumbs] = useState(tD);

  return (
    <div
      className="h-[50px] w-[50px] ml-2 grid grid-col place-items-center"
      onClick={() => {
        setThumbs(!thumbs);
        thumbs ? hateCancelHandler(dogamId) : hateClickHandler(dogamId);
        // !tD;
        // 싫어요 누를때 post 요청보내야 함 (dogamId)
      }}
    >
      {thumbs ? (
        <img src="/image/thumbsDownOn.png" />
      ) : (
        <img src="/image/thumbsDown.png" />
      )}
    </div>
  );
}
