// /api/itemshop
// 아이템 리스트 조회
// import { useState, useEffect } from "react";
// import { useItemshopStore } from "@/stores/ItemshopStore";
// import { ItemType } from "@/types/itemTypes";

// const useItemList = () => {
//   const [itemList, setItemList] = useState<ItemType[]>([]);

//   useEffect(() => {
//     async function fetchItemList() {
//       const itemList = await useItemshopStore().fetchItems();

//       setItemList(itemList);
//     }

//     fetchItemList();
//   }, []);

//   return itemList;
// };

// export default useItemList;

import { useQuery } from "@tanstack/react-query";
import { useItemshopStore } from "@/stores/ItemshopStore";
import { useShallow } from "zustand/react/shallow";

const { items, fetchItems } = useItemshopStore(
  useShallow((state) => ({
    items: state.items,
    fetchItems: state.fetchItems,
  }))
);

const useItemListQuery = () => {
  useQuery(queryKeys.FRIENDS, () => fetchFriends());
};

export default useItemListQuery;
