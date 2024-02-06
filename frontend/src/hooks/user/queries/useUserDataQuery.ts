import { getUserData } from "@/services/user/api";
import { useQuery } from "@tanstack/react-query";

export const useUserData = () => {
  const useUserDataQuery = () => {
    return useQuery({
      queryKey: ["userData"],
      queryFn: () => getUserData(),
    });
  };
  return { useUserDataQuery };
};
