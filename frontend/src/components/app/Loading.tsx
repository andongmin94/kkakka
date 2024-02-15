import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export default function Loading() {
  // use React Query `useIsFetching` to determine whether or not to display
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const display = isFetching || isMutating ? "inherit" : "none";
  const [progress, setProgress] = useState(13);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <div style={{ display }} className="relative">
        <Progress value={progress} className="absolute top-32 left-80 " />
        {/* <div className="absolute top-[300px] right-[400px]">
          로딩 화면이 지속되면 새로고침을 눌러주세요 👻
        </div> */}
      </div>
    </>
  );
}
