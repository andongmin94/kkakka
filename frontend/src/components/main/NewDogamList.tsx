import useDogamFeedListQuery from "@/apis/dogamfeed/queries/useDogamFeedListQuery";
import NewDogam from "@/components/main/NewDogam";

export default function NewDogamList() {
  const { dogamfeedList, isLoading, error } = useDogamFeedListQuery();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.{error.message}</div>;

  return (
    <div>
      {dogamfeedList &&
        dogamfeedList.map((data, idx) => {
          return <NewDogam data={data} key={idx} />;
        })}
    </div>
  );
}
