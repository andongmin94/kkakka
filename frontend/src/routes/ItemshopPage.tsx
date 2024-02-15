import Speaker from "@/components/itemShop/Speaker";
import WriteAlias from "@/components/itemShop/WriteAlias";
import Compliment from "@/components/itemShop/Compliment";
import MyPoint from "@/components/itemShop/MyPoint";

import { useEffect, useState } from "react";
import axios from "axios";
import { ItemType } from "@/types/itemTypes";
import { Toaster } from "@/components/ui/toaster";

export default function ItemshopPage() {
  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    // 아이템샵 목록을 불러오는 API 호출
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/itemshop`)
      .then((res) => {
        // 아이템 목록을 상태에 설정
        setItemList(res.data.data.itemList);
      })
      .catch((error) => {
        console.error("아이템 목록을 불러오는 중 에러 발생:", error);
      });
  }, [setItemList]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/friends`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("친구목록", res.data.data.friendList);
        setFriendList(res.data.data.friendList);
      })
      .catch((error) => {
        console.error("친구목록을 불러오는 중 에러 발생:", error);
      });
  }, [setFriendList]);

  const [point, setPoint] = useState<number>(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/point`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("포인트", res.data.data.Point);
        setPoint(res.data.data.Point);
      });
  }, []);

  return (
    <>
      <div className="text-lg mb-5 flex ml-10 ">
        <p className="grid place-items-center ml-2 font-bold">아이템샵</p>
      </div>
      <div className="mr-5">
        <MyPoint point={point} />
      </div>

      {itemList && itemList.length > 0 && (
        <div className="flex flex-col items-center ml-60">
          <div className="grid grid-cols-4 row-auto w-[1000px] h-[900px]">
            {itemList.map(
              (item, idx) =>
                idx !== 1 && (
                  <div
                    key={item.itemName}
                    className="flex flex-col items-center"
                  >
                    {item.itemName === "칭호 지정권" && (
                      <WriteAlias
                        itemName={item.itemName}
                        itemPrice={item.itemPrice}
                        itemDesc={item.itemDesc}
                        myPoint={point}
                        friends={friendList}
                        setParentPoint={setPoint}
                      />
                    )}
                    {item.itemName === "강제 칭찬권" && (
                      <Compliment
                        itemName={item.itemName}
                        itemPrice={item.itemPrice}
                        itemDesc={item.itemDesc}
                        myPoint={point}
                        friends={friendList}
                        setParentPoint={setPoint}
                      />
                    )}
                    {item.itemName === "확성기" && (
                      <Speaker
                        itemName={item.itemName}
                        itemPrice={item.itemPrice}
                        itemDesc={item.itemDesc}
                        myPoint={point}
                        setParentPoint={setPoint}
                      />
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}
