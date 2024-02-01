// /api/profile/dogam?email=osy9536@kakao.com
// 프로필 도감 리스트 확인하기

import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";

import { useProfileDogamStore } from "@/stores/ProfileStore";
import { BroadcastListResponse } from "@/types/broadcastTypes";
import { ErrorResponse } from "@/types/commonTypes";
import { useShallow } from "zustand/react/shallow";

const useDogamList = ({}) => {
  const { profileDogams, fetchProfileDogams } = useProfileDogamStore(
    useShallow((state) => ({
      profileDogams: state.profileDogams,
      fetchProfileDogams: state.fetchProfileDogams,
    }))
  );
  const queryFn = () => useProfileDogamStore().fetchProfileDogams();

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

export default useDogamList;
