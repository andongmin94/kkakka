import { useState } from "react";
import { useDislikeDogam } from "@/hooks/dogamfeed/mutations/useDislikePost";
import { useDislikeDeleteDogam } from "@/hooks/dogamfeed/mutations/useDislikeDelete";

export default function ThumbsDown({
  tD,
  dogamId,
}: {
  tD: boolean;
  dogamId: number;
}) {
  const [thumbs, setThumbs] = useState(tD);

  const dislikeDogamMutation = useDislikeDogam();
  const { mutate: dislikeMutate } = dislikeDogamMutation;
  const hateClickHandler = (dogamId: number) => {
    dislikeMutate(dogamId);
  };

  const cancleDislikeDogamMutation = useDislikeDeleteDogam();
  const { mutate: cancleDislikeMutate } = cancleDislikeDogamMutation;
  const hateCancelHandler = (dogamId: number) => {
    cancleDislikeMutate(dogamId);
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
