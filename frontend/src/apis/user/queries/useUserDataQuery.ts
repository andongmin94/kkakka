import { useQuery } from "@tanstack/react-query";
import { USER_DATA } from "@/constants/queryKeys";
import { useProfileStore } from "@/stores/ProfileStore";

const useUserDataQuery = ({ userId }: { userId: number }) => {
  const { fetchProfile } = useProfileStore();

  const {
    data: profileData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [USER_DATA, userId],
    queryFn: () => fetchProfile(userId),
  });

  return { profileData, error, isLoading };
};

export default useUserDataQuery;
