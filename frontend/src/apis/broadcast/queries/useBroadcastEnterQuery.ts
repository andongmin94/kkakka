import { useQuery } from "@tanstack/react-query";
import { useBroadcastStore } from "@/stores/BroadcastStore";
import { useShallow } from "zustand/react/shallow";

const { broadcasts, enterBroadcast } = useBroadcastStore(
  useShallow((state) => ({
    broadcasts: state.broadcasts,
    enterBroadcast: state.enterBroadcast,
  }))
);

const useBroadcastEnterQuery = () => {
  useQuery(queryKeys.BROADCAST, () => enterBroadcast());
};
export default useBroadcastEnterQuery;
