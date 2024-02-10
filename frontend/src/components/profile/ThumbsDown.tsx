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

  const hateClickHandler = async (dogamId: number) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/friends/dogam/hate/${dogamId}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("hateClickHandler", res);
  };

  const hateCancelHandler = async (dogamId: number) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/friends/dogam/hate/${dogamId}`,

      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("hateCancelHandler", res);
  };

  return (
    <div
      className="h-[50px] w-[50px] ml-2 grid grid-col place-items-center"
      onClick={() => {
        setThumbs(!thumbs);
        thumbs ? hateCancelHandler(dogamId) : hateClickHandler(dogamId);
        // !tD;
      }}
    >
      {thumbs ? (
        // <img src="/image/thumbsDownOn.png" />
        <div>👎</div>
      ) : (
        // <img src="/image/thumbsDown.png" />
        <div>👍</div>
      )}
    </div>
  );
}
