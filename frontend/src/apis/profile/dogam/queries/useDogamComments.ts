// /api/friends/dogam/dogam-id
// 도감 클릭시 - 도감 상세 조회 (댓글조회)

import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";

import { useProfileDogamStore } from "@/stores/ProfileStore";
import { BroadcastListResponse } from "@/types/broadcastTypes";
import { ErrorResponse } from "@/types/commonTypes";
import { useShallow } from "zustand/react/shallow";

const useDogamComments = ({ dogamId }) => {
  const { dogamDetail, fetchDogamDetail } = useProfileDogamStore(
    useShallow((state) => ({
      dogamDetail: state.dogamDetail,
      fetchDogamDetail: state.fetchDogamDetail,
    }))
  );
  const queryFn = () => useProfileDogamStore().fetchDogamDetail(dogamId);

  const { isLoading, data, isError, error } = useQuery<
    AxiosResponse<BroadcastListResponse>,
    AxiosError<ErrorResponse>
  >({ queryKey: ["dogamDetail"], queryFn });

  return {
    isLoading,
    data: data?.data,
    isError,
    errorMessage: error?.response?.data.message,
  };
};

export default useDogamComments;
