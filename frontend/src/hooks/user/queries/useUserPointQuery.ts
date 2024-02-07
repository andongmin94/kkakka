import { getUserPoint } from "@/services/user/userPointApi";
import { useQuery } from "@tanstack/react-query";

export const usePoint = () => {
  const usePointQuery = () => {
    return useQuery({
      queryKey: ["userPoint"],
      queryFn: () => getUserPoint(),
    });
  };
  return { usePointQuery };
};
