import { getBroadcastList } from "@/services/broadcast/broadcastDataApi";
import { useQuery } from "@tanstack/react-query";

export const useBroadcastList = () => {
  const useBroadcastListQuery = () => {
    return useQuery({
      queryKey: ["broadcastList"],
      queryFn: () => getBroadcastList(),
    });
  };

  return { useBroadcastListQuery };
};
