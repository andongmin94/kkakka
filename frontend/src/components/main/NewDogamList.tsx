import NewDogam from "@/components/main/NewDogam";
import { NewDogamType } from "@/types/dogamTypes";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

interface PageData {
  results: NewDogamType[];
  nextPageParam: number;
  theLastPage: number;
}

export default function NewDogamList() {
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

  const fetchDogamList = async (pageParam: number): Promise<PageData> => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/friends/dogam?page=${pageParam}&size=5`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = {
      results: res.data.data.data,
      nextPageParam: res.data.data.currentPage + 1,
      theLastPage: res.data.data.totalPages,
    };

    return data;
  };

  return (
    <div>
      <InfiniteScroll
        loadMore={() => {
          if (!isFetching) {
            fetchNextPage();
          }
        }}
        hasMore={hasNextPage}
      >
        <div className="grid grid-cols-3 gap-4">
          {data &&
            data.pages.map((pageData) => {
              return pageData.results.map((dogam: NewDogamType) => {
                return <NewDogam key={dogam.dogamId} data={dogam} />;
              });
            })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
