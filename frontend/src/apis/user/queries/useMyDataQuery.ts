import { useQuery } from "@tanstack/react-query";
import { MY_DATA } from "@/constants/queryKeys";
import { useMainStore } from "@/stores/MainStore";

const useMyDataQuery = () => {
  const { fetchMyData } = useMainStore();

  const {
    data: userData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [MY_DATA],
    queryFn: fetchMyData,
  });

  return { userData, error, isLoading };
};

export default useMyDataQuery;
