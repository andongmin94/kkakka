// /api/friends/dm/load/{chatRoomId}
// 1대 1 채팅방 이전내용 불러오기

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useDmStore } from "@/stores/DmStore";
import { useShallow } from "zustand/react/shallow";

const { dmDetailChatList, loadDmDetail } = useDmStore(
  useShallow((state) => ({
    dmDetailChatList: state.dmDetailChatList,
    loadDmDetail: state.fetchDmList,
  }))
);

const useDmListQuery = () => {
  useQuery(queryKeys.DMLIST, () => loadDmDetail());
};

export default useDmListQuery;
