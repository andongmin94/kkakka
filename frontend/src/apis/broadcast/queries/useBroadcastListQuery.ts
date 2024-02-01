// import { useQuery } from "@tanstack/react-query";
// import { AxiosResponse, AxiosError } from "axios";

// import { useMainStore } from "@/stores/MainStore";
// import { BroadcastListResponse } from "@/types/broadcastTypes";
// import { ErrorResponse } from "@/types/commonTypes";

// const useLiveBroadcastList = () => {
//   const queryFn = () => useMainStore().fetchLiveBroadcastList();
//   const { isLoading, data, isError, error } = useQuery<
//     AxiosResponse<BroadcastListResponse>,
//     AxiosError<ErrorResponse>
//   >({ queryKey: ["broadcastList"], queryFn });

//   return {
//     isLoading,
//     data: data?.data,
//     isError,
//     errorMessage: error?.response?.data.message,
//   };
// };

// export default useLiveBroadcastList;

import { useQuery } from "@tanstack/react-query";
import { useBroadcastStore } from "@/stores/BroadcastStore";
import { useShallow } from "zustand/react/shallow";

const { broadcasts, fetchBroadcasts } = useBroadcastStore(
  useShallow((state) => ({
    broadcasts: state.broadcasts,
    fetchBroadcasts: state.fetchBroadcasts,
  }))
);

const useBroadcastListQuery = () => {
  useQuery(queryKeys.BROADCAST, () => fetchBroadcasts());
};
export default useBroadcastListQuery;
