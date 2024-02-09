import NewDogam from "@/components/main/NewDogam";
import axios from "axios";
import { NewDogamType } from "@/types/dogamTypes";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";

interface PageData {
  results: NewDogamType[];
  nextPageParam: number;
  theLastPage: number;
}

const token = localStorage.getItem("token");

const fetchDogamList = async (pageParam: number): Promise<PageData> => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/dogam/feed?page=${pageParam}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  console.log("페치도감리스트", res);
  return {
    results: res.data.data, // 실제 도감 리스트임
    nextPageParam: pageParam + 1, // 다음페이지
    theLastPage: res.data.totalPages,
  };
};

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
        {data!.pages.map((pageData) => {
          return pageData.results.map((dogam: NewDogamType) => {
            return <NewDogam key={dogam.dogamId} data={dogam} />;
          });
        })}
      </InfiniteScroll>
    </div>
  );
}
