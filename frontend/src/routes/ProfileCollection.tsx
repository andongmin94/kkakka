// ProfileCollection.tsx

import { useParams } from "react-router-dom";
import { Mobile, PC } from "@/components/MediaQuery";
import Collection from "@/components/profile/Collection";
import AddCollection from "@/components/profile/AddCollection";
import userStore from "@/store/user/userStore";
import InfiniteScroll from "react-infinite-scroller";
import { ProfileDogamWithDislikeNumType } from "@/types/dogamTypes";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface PageData {
  results: ProfileDogamWithDislikeNumType[];
  nextPageParam: number;
  theLastPage: number;
}

export default function ProfileCollection() {
  const params = useParams();
  const { userInfo } = userStore();

  const paramsId = Number(params.id);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["profileDogamFeed", paramsId],
    queryFn: ({ queryKey, pageParam }) => {
      const [, paramsId] = queryKey as [string, number];
      return fetchProfileDogamList(paramsId, pageParam);
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

  const fetchProfileDogamList = async (
    paramsId: number,
    pageParam: number
  ): Promise<PageData> => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/friends/dogam/users/${paramsId}?page=${pageParam}&size=5`,
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
    <>
      <PC>
        <div className="ml-3 mt-3">
          <div>
            <InfiniteScroll
              loadMore={() => {
                if (!isFetching) {
                  fetchNextPage();
                }
              }}
              hasMore={hasNextPage}
            >
              <div className="grid grid-cols-3 gap-2 ">
                {data &&
                  data.pages.map((pageData) => {
                    return pageData.results.map(
                      (profiledogam: ProfileDogamWithDislikeNumType) => {
                        return (
                          <Collection
                            key={profiledogam.dogamId}
                            profiledogam={profiledogam}
                          />
                        );
                      }
                    );
                  })}
              </div>
            </InfiniteScroll>
          </div>
        </div>
        <div className="flex justify-center mb-2 fixed bottom-0 left-5">
          {paramsId != userInfo.userId ? (
            <AddCollection userId={paramsId} />
          ) : null}
        </div>
      </PC>

      {/* ----------------------------------------------------- */}

      <Mobile>
        <div className="w-full my-10 grid grid-cols-1 row-auto place-items-center">
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
                  return pageData.results.map(
                    (profiledogam: ProfileDogamWithDislikeNumType) => {
                      return (
                        <Collection
                          key={profiledogam.dogamId}
                          profiledogam={profiledogam}
                        />
                      );
                    }
                  );
                })}
            </InfiniteScroll>
          </div>
        </div>
        <div className="flex justify-center mb-2 fixed bottom-1 right-20">
          {paramsId != userInfo.userId ? (
            <AddCollection userId={paramsId} />
          ) : null}
        </div>
      </Mobile>
    </>
  );
}
