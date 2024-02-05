// 데이터 페칭할때 메일을 넘겨야함
import { useQuery } from "@tanstack/react-query";
import { ALIAS_LIST } from "@/constants/queryKeys";
import { useAliasStore } from "@/stores/ProfileStore";

const useAliasListQuery = ({ userEmail }: { userEmail: string }) => {
  const { fetchAliases } = useAliasStore();

  const {
    data: aliases,
    error,
    isLoading,
  } = useQuery({
    queryKey: [ALIAS_LIST, userEmail],
    queryFn: () => fetchAliases(userEmail),
  });

  return { aliases, error, isLoading };
};

export default useAliasListQuery;
