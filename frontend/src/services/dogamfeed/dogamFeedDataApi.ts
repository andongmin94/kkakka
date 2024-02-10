import { axiosInstance } from "@/utils/axios";
import { NewDogamType } from "@/types/dogamTypes";

interface PageData {
  results: NewDogamType[];
  nextPageParam: number;
  theLastPage: number;
}

export const fetchDogamList = async (pageParam: number): Promise<PageData> => {
  const res = await axiosInstance.get(
    `/api/friends/dogam?page=${pageParam}&size=5`
  );

  const data = {
    results: res.data.data.data,
    nextPageParam: res.data.data.currentPage + 1,
    theLastPage: res.data.data.totalPages,
  };

  return data;
};
