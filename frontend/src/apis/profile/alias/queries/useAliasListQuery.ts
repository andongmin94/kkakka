// /api/profile/alias?email=osy9536@kakao.com
// 불명예의 전당 - 칭호 리스트 보기

import { useQuery } from "@tanstack/react-query";
import { useAliasStore } from "@/stores/ProfileStore";
import { useShallow } from "zustand/react/shallow";

const { aliases, fetchAliases } = useAliasStore(
  useShallow((state) => ({
    aliases: state.aliases,
    fetchAliases: state.fetchAliases,
  }))
);

const useAliasListQuery = () => {
  useQuery(queryKeys.FRIENDS, () => fetchAliases());
};

export default useAliasListQuery;
