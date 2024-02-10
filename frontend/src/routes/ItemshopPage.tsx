import Speaker from "@/components/itemShop/Speaker";
import WriteAlias from "@/components/itemShop/WriteAlias";
import Compliment from "@/components/itemShop/Compliment";
import DeleteCollection from "@/components/itemShop/DeleteCollection";
import useItemshopStore from "@/store/itemshop/itemshopStore";
import usePointStore from "@/store/user/pointStore";
import useFriendStore from "@/store/friend/friendStore";
import { useEffect } from "react";
import { useItemList } from "@/hooks/itemshop/queries/useItemListQuery";

export default function ItemshopPage() {
  const { useItemListQuery } = useItemList();
  const { data, refetch } = useItemListQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const { itemList } = useItemshopStore();
  const { point } = usePointStore();
  const { friendList } = useFriendStore();

  return (
    <>
      <div className="text-3xl mb-10 flex">
        {/* <img src="/image/itemShop.png" className="h-[50px] w-[50px]" /> */}
        <p className="grid place-items-center ml-2 font-bold">아이템샵</p>
      </div>
      {itemList && (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-4 row-auto w-[1000px] h-[900px]">
            <div className="flex flex-col items-center">
              <WriteAlias
                itemName={itemList[0].itemName}
                itemPrice={itemList[0].itemPrice}
                itemDesc={itemList[0].itemDesc}
                myPoint={point}
                friends={friendList}
              />
            </div>
            <div className="flex flex-col items-center">
              <DeleteCollection
                itemName={itemList[1].itemName}
                itemPrice={itemList[1].itemPrice}
                // itemDesc={itemList[1].itemDesc}
                myPoint={point}
              />
            </div>
            <div className="flex flex-col items-center">
              <Compliment
                itemName={itemList[2].itemName}
                itemPrice={itemList[2].itemPrice}
                // itemDesc={itemList[2].itemDesc}
                myPoint={point}
                friends={friendList}
              />
            </div>
            <div className="flex flex-col items-center">
              <Speaker
                itemName={itemList[3].itemName}
                itemPrice={itemList[3].itemPrice}
                // itemDesc={itemList[3].itemDesc}
                myPoint={point}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
