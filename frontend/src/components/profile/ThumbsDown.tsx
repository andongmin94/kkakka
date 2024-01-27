import { useState } from "react";

export default function ThumbsDown() {
  const [tD, setTd] = useState(false);
  return (
    <div
      className="h-10 w-10 ml-2"
      onClick={() => {
        setTd(!tD);
      }}
    >
      {tD ? (
        <img src="/image/thumbsDownOn.png" />
      ) : (
        <img src="/image/thumbsDown.png" />
      )}
    </div>
  );
}
