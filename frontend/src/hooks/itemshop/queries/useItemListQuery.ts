import { getItemList } from "@/services/itemshop/itemDataApi";
import { useQuery } from "@tanstack/react-query";

export const useItemList = () => {
  const useItemListQuery = () => {
    return useQuery({
      queryKey: ["itemList"],
      queryFn: () => getItemList(),
    });
  };

  return { useItemListQuery };
};
