import { useQuery } from "@tanstack/react-query";
import { DOGAM_DETAIL } from "@/constants/queryKeys";
import { useProfileDogamStore } from "@/stores/ProfileStore";

const useDogamDetailQuery = ({ dogamId }: { dogamId: number }) => {
  const { fetchDogamDetail } = useProfileDogamStore();

  const {
    data: dogamComments,
    error,
    isLoading,
  } = useQuery({
    queryKey: [DOGAM_DETAIL, dogamId],
    queryFn: () => fetchDogamDetail(dogamId),
  });

  return { dogamComments, error, isLoading };
};

export default useDogamDetailQuery;
