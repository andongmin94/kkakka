import { useQuery } from "@tanstack/react-query";
import { ITEM_LIST } from "@/constants/queryKeys";
import { useItemshopStore } from "@/stores/ItemshopStore";

const useItemListQuery = () => {
  const { fetchItems } = useItemshopStore();

  const {
    data: items,
    error,
    isLoading,
  } = useQuery({
    queryKey: [ITEM_LIST],
    queryFn: fetchItems,
  });

  return { items, error, isLoading };
};

export default useItemListQuery;
