import { useQuery } from "@tanstack/react-query";
import { PROFILE_DOGAM_LIST } from "@/constants/queryKeys";
import { useProfileDogamStore } from "@/stores/ProfileStore";

const useProfileDogamsQuery = ({ userEmail }: { userEmail: string }) => {
  const { fetchProfileDogams } = useProfileDogamStore();

  const {
    data: profileDogams,
    error,
    isLoading,
  } = useQuery({
    queryKey: [PROFILE_DOGAM_LIST, userEmail],
    queryFn: () => fetchProfileDogams(userEmail),
  });

  return { profileDogams, error, isLoading };
};

export default useProfileDogamsQuery;
