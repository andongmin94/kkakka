import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";

import { useMainStore } from "@/stores/MainStore";
import { BroadcastListResponse } from "@/types/broadcastTypes";
import { ErrorResponse } from "@/types/commonTypes";

const useLiveBroadcastList = () => {
  const queryFn = () => useMainStore().fetchLiveBroadcastList();
  const { isLoading, data, isError, error } = useQuery<
    AxiosResponse<BroadcastListResponse>,
    AxiosError<ErrorResponse>
  >({ queryKey: ["broadcastList"], queryFn });

  return {
    isLoading,
    data: data?.data,
    isError,
    errorMessage: error?.response?.data.message,
  };
};

export default useLiveBroadcastList;
