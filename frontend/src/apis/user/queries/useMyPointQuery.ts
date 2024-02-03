import { useQuery } from "@tanstack/react-query";
import { MY_POINT } from "@/constants/queryKeys";
import { useMainStore } from "@/stores/MainStore";

const useMyPointQuery = () => {
  const { fetchMyPoint } = useMainStore();

  const {
    data: items,
    error,
    isLoading,
  } = useQuery({
    queryKey: [MY_POINT],
    queryFn: fetchMyPoint,
  });

  return { items, error, isLoading };
};

export default useMyPointQuery;
