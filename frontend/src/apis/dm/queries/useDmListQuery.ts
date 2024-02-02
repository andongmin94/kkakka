import { useQuery } from "@tanstack/react-query";
import { DM_LIST } from "@/constants/queryKeys";
import { useDmStore } from "@/stores/DmStore";

const useDmListQuery = () => {
  const { fetchDmList } = useDmStore();

  const {
    data: dmList,
    error,
    isLoading,
  } = useQuery({
    queryKey: [DM_LIST],
    queryFn: fetchDmList,
  });

  return { dmList, error, isLoading };
};

export default useDmListQuery;
