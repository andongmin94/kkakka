import Speaker from "@/components/itemShop/Speaker";
import WriteAlias from "@/components/itemShop/WriteAlias";
import Compliment from "@/components/itemShop/Compliment";
import DeleteCollection from "@/components/itemShop/DeleteCollection";
import axios from "axios";
import { useEffect, useState } from "react";
import { FriendType } from "@/types/friendTypes";
import useItemshopStore from "@/store/itemshop/itemshopStore";
import usePointStore from "@/store/user/pointStore";

export default function ItemshopPage() {
  const token = localStorage.getItem("token");

  const { itemList } = useItemshopStore();
  const { point } = usePointStore();

  const [friends, setFriends] = useState<FriendType[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/friends`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("친구목록", res.data.data.friendList);
        setFriends(res.data.data.friendList);
      });
  }, []);

  return (
    <>
      <div className="text-3xl mb-10 flex">
        <img src="/image/itemShop.png" className="h-[50px] w-[50px]" />
        <p className="grid place-items-center ml-2 font-bold">아이템샵</p>
      </div>
      {itemList && (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-2 row-auto w-[900px] h-[900px]">
            <div className="flex flex-col items-center">
              <WriteAlias
                itemName={itemList[0].itemName}
                itemPrice={itemList[0].itemPrice}
                itemDesc={itemList[0].itemDesc}
                myPoint={point}
                friends={friends}
              />
            </div>
            <div className="flex flex-col items-center">
              <DeleteCollection
                itemName={itemList[1].itemName}
                itemPrice={itemList[1].itemPrice}
                itemDesc={itemList[1].itemDesc}
                myPoint={point}
              />
            </div>
            <div className="flex flex-col items-center">
              <Compliment
                itemName={itemList[2].itemName}
                itemPrice={itemList[2].itemPrice}
                itemDesc={itemList[2].itemDesc}
                myPoint={point}
                friends={friends}
              />
            </div>
            <div className="flex flex-col items-center">
              <Speaker
                itemName={itemList[3].itemName}
                itemPrice={itemList[3].itemPrice}
                itemDesc={itemList[3].itemDesc}
                myPoint={point}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
