import { Progress } from "@/components/ui/progress";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export default function Loading() {
  // use React Query `useIsFetching` to determine whether or not to display
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const display = isFetching || isMutating ? "inherit" : "none";

  return (
    <Progress>
      <div>Loading...</div>
    </Progress>
  );
}
