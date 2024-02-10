import NewDogam from "@/components/main/NewDogam";
import { NewDogamType } from "@/types/dogamTypes";
import InfiniteScroll from "react-infinite-scroller";
import { useDogamFeedList } from "@/hooks/dogamfeed/queries/useDogamFeedInfiniteQuery";

export default function NewDogamList() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useDogamFeedList();

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
        {data &&
          data.pages.map((pageData) => {
            console.log("페이지데이터", pageData);
            return pageData.results.map((dogam: NewDogamType) => {
              return <NewDogam key={dogam.dogamId} data={dogam} />;
            });
          })}
      </InfiniteScroll>
    </div>
  );
}
