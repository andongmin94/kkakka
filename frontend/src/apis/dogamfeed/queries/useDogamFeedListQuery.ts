import { useQuery } from "@tanstack/react-query";
import { DOGAMFEED_LIST } from "@/constants/queryKeys";
import { useFeedStore } from "@/stores/FeedStore";

const useDogamFeedListQuery = () => {
  const { fetchNewDogamList } = useFeedStore();

  const {
    data: dogamfeedList,
    error,
    isLoading,
  } = useQuery({
    queryKey: [DOGAMFEED_LIST],
    queryFn: fetchNewDogamList,
  });

  return { dogamfeedList, error, isLoading };
};

export default useDogamFeedListQuery;
