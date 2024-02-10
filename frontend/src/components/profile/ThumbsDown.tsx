import { useState } from "react";

export default function ThumbsDown({
  tD,
  dogamId,
}: {
  tD: boolean;
  dogamId: number;
}) {
  const [thumbs, setThumbs] = useState(tD);

  const hateCancelHandler = {};

  const hateClickHandler = {};

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
