import { useQuery } from "@tanstack/react-query";
import { useMainStore } from "@/stores/MainStore";
import { AxiosResponse, AxiosError } from "axios";
import { ErrorResponse } from "@/types/commonTypes";
import { BroadcastListResponse } from "@/types/broadcastTypes";

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
