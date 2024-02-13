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
      <div style={{ display }}>
        <Progress value={progress} />
      </div>
    </>
  );
}
