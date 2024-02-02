import { useQuery } from "@tanstack/react-query";
import { BROADCAST_LIST } from "@/constants/queryKeys";
import { useBroadcastStore } from "@/stores/BroadcastStore";

const useBroadcastListQuery = () => {
  const { fetchLiveBroadcastList } = useBroadcastStore();

  const {
    data: broadcasts,
    error,
    isLoading,
  } = useQuery({
    queryKey: [BROADCAST_LIST],
    queryFn: fetchLiveBroadcastList,
  });

  return { broadcasts, error, isLoading };
};

export default useBroadcastListQuery;
