import { useQuery } from "@tanstack/react-query";
import { useItemshopStore } from "@/stores/ItemshopStore";
import { useShallow } from "zustand/react/shallow";
import { ITEM_LIST } from "@/constants/queryKeys";

const { fetchItems } = useItemshopStore(
  useShallow((state) => ({
    fetchItems: state.fetchItems,
  }))
);

const useItemListQuery = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: [ITEM_LIST],
    queryFn: () => fetchItems(),
  });
  return { data, error, isLoading };
};

export default useItemListQuery;
