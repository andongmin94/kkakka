import { getProfile } from "@/services/profile/profileDataApi";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  const useUserProfileQuery = (userId: string) => {
    return useQuery({
      queryKey: ["user", userId],
      queryFn: () => getProfile(userId),
    });
  };

  return { useUserProfileQuery };
};
