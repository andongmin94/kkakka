import { useParams } from "react-router-dom";
import { Mobile, PC } from "@/components/MediaQuery";
import Collection from "@/components/profile/Collection";
import AddCollection from "@/components/profile/AddCollection";
import userStore from "@/store/user/userStore";
import { useProfileDogamQuery } from "@/hooks/profile/queries/useProfileDogamQuery";
import InfiniteScroll from "react-infinite-scroller";
import { ProfileDogamType } from "@/types/dogamTypes";

export default function ProfileCollection() {
  const params = useParams();
  const { userInfo } = userStore();

  const paramsId = Number(params.id);

  const { data, fetchNextPage, hasNextPage, isFetching } =
    useProfileDogamQuery(paramsId);

  return (
    <>
      <PC>
        <div className="w-[1000px] m-1 grid grid-cols-3 row-auto place-items-center">
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
                  return pageData.results.map(
                    (profiledogam: ProfileDogamType) => {
                      console.log("results프로필도감", profiledogam);
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
        {/* 자기 프로필이 아닐때만 도감 추가 가능하게 */}
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
                  console.log("페이지데이터", pageData);
                  return pageData.results.map(
                    (profiledogam: ProfileDogamType) => {
                      console.log("results프로필도감", profiledogam);
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
        {/* 자기 프로필이 아닐때만 도감 추가 가능하게 */}
        <div className="flex justify-center mb-2 fixed bottom-1 right-20">
          {paramsId != userInfo.userId ? (
            <AddCollection userId={paramsId} />
          ) : null}
        </div>
      </Mobile>
    </>
  );
}
