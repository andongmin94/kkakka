import { getDishonorList } from "@/services/profile/profileDishonorDataApi";
import { useQuery } from "@tanstack/react-query";

export const useDishonor = () => {
  const useDishonorQuery = (userId: string) => {
    return useQuery({
      queryKey: ["dishonor", userId],
      queryFn: () => getDishonorList(userId),
    });
  };

  return { useDishonorQuery };
};
