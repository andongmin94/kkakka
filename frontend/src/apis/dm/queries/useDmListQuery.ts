import { useQuery } from "@tanstack/react-query";
import { useDmStore } from "@/stores/DmStore";
import { useShallow } from "zustand/react/shallow";

const { dmList, fetchDmList } = useDmStore(
  useShallow((state) => ({
    dmList: state.dmList,
    fetchDmList: state.fetchDmList,
  }))
);

const useDmListQuery = () => {
  useQuery(queryKeys.DMLIST, () => fetchDmList());
};

export default useDmListQuery;
