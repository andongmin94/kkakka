import { useInfiniteQuery } from "@tanstack/react-query";
import { NewDogamType } from "@/types/dogamTypes";
import { fetchDogamList } from "@/services/dogamfeed/dogamFeedDataApi";

interface PageData {
  results: NewDogamType[];
  nextPageParam: number;
  theLastPage: number;
}
export const useDogamFeedList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["dogamfeed"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchDogamList(pageParam),
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
