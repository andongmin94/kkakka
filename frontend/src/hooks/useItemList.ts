import { useState, useEffect } from "react";
import { useItemshopStore } from "@/stores/ItemshopStore";
import { ItemType } from "@/types/itemTypes";

const useItemList = () => {
  const [itemList, setItemList] = useState<ItemType[]>([]);

  useEffect(() => {
    async function fetchItemList() {
      const itemList = await useItemshopStore().fetchItems();

      setItemList(itemList);
    }

    fetchItemList();
  }, []);

  return itemList;
};

export default useItemList;
