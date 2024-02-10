import { axiosInstance } from "@/utils/axios";
import { ProfileDogamType } from "@/types/dogamTypes";

interface PageData {
  results: ProfileDogamType[];
  nextPageParam: number;
  theLastPage: number;
}

export const fetchProfileDogamList = async (
  userId: number,
  pageParam: number
): Promise<PageData> => {
  const res = await axiosInstance.get(
    `/api/friends/dogam/users/${userId}?page=${pageParam}&size=5`
  );
  console.log("페치프로필도감 service", res.data.data);

  const data = {
    results: res.data.data.data,
    nextPageParam: res.data.data.currentPage + 1,
    theLastPage: res.data.data.totalPages,
  };

  return data;
};
