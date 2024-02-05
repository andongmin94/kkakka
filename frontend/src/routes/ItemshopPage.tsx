import Speaker from "@/components/itemShop/Speaker";
import WriteAlias from "@/components/itemShop/WriteAlias";
import Compliment from "@/components/itemShop/Compliment";
import DeleteCollection from "@/components/itemShop/DeleteCollection";
import axios from "axios";
import { useEffect, useState } from "react";
import { ItemType } from "@/types/itemTypes";
export default function ItemshopPage() {
  // console.log(items[0].itemName); // 칭호지정
  // console.log(items[1].itemName); // 도감삭제
  // console.log(items[2].itemName); // 강제칭찬
  // console.log(items[3].itemName); // 확성기
  const token = localStorage.getItem("token");

  const [items, setItems] = useState<ItemType[]>();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/itemshop`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.data.itemList);
        setItems(res.data.data.itemList);
      });
  }, []);

  return (
    <>
      <div className="text-3xl mb-10 flex">
        <img src="/image/itemShop.png" className="h-[50px] w-[50px]" />
        <p className="grid place-items-center ml-2 font-bold">아이템샵</p>
      </div>
      {items && (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-2 row-auto w-[900px] h-[900px]">
            <div className="flex flex-col items-center">
              <WriteAlias
                itemName={items[0].itemName}
                itemPrice={items[0].itemPrice}
                itemDesc={items[0].itemDesc}
              />
            </div>
            <div className="flex flex-col items-center">
              <DeleteCollection
                itemName={items[1].itemName}
                itemPrice={items[1].itemPrice}
                itemDesc={items[1].itemDesc}
              />
            </div>
            <div className="flex flex-col items-center">
              <Compliment
                itemName={items[2].itemName}
                itemPrice={items[2].itemPrice}
                itemDesc={items[2].itemDesc}
              />
            </div>
            <div className="flex flex-col items-center">
              <Speaker
                itemName={items[3].itemName}
                itemPrice={items[3].itemPrice}
                itemDesc={items[3].itemDesc}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
