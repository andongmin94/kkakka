// 메인페이지 도감확인
// /api/friends/dogam

import { useQuery } from "@tanstack/react-query";
import { useFeedStore } from "@/stores/FeedStore";
import { useShallow } from "zustand/react/shallow";

const { newDogamList, fetchNewDogamList } = useFeedStore(
  useShallow((state) => ({
    newDogamList: state.newDogamList,
    fetchNewDogamList: state.fetchNewDogamList,
  }))
);

const useDmListQuery = () => {
  useQuery(queryKeys.DMLIST, () => fetchNewDogamList());
};

export default useDmListQuery;
