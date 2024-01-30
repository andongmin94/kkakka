import { useState } from "react";

export default function ThumbsDown({ tD }: { tD: boolean }) {
  const [thumbs, setThumbs] = useState(tD);
  return (
    <div
      className="h-[50px] w-[50px] ml-2 grid grid-col place-items-center"
      onClick={() => {
        setThumbs(!thumbs);
        console.log(thumbs);
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
