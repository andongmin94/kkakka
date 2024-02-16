import { useInfiniteQuery } from "@tanstack/react-query";
import { ProfileDogamType } from "@/types/dogamTypes";
import { fetchProfileDogamList } from "@/services/profile/profileDogamDataApi";

interface PageData {
  results: ProfileDogamType[];
  nextPageParam: number;
  theLastPage: number;
}

export const useProfileDogamQuery = (userId: number) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["profileDogamFeed", userId],
    queryFn: ({ queryKey, pageParam }) => {
      const [, userId] = queryKey as [string, number];
      return fetchProfileDogamList(userId, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: PageData) => {
      if (lastPage.nextPageParam === lastPage.theLastPage) {
        return undefined;
      } else {
        return lastPage.nextPageParam;
      }
    },
  });

  return { data, fetchNextPage, hasNextPage, isFetching };
};
