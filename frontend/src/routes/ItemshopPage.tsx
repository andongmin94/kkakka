import Speaker from "@/components/itemShop/Speaker";
import WriteAlias from "@/components/itemShop/WriteAlias";
import Compliment from "@/components/itemShop/Compliment";
import DeleteCollection from "@/components/itemShop/DeleteCollection";
// import useItemshopStore from "@/store/itemshop/itemshopStore";
import usePointStore from "@/store/user/pointStore";
// import useFriendStore from "@/store/friend/friendStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { ItemType } from "@/types/itemTypes";

export default function ItemshopPage() {
  // const { itemList, setItemList } = useItemshopStore();
  const { point } = usePointStore();
  // const { friendList } = useFriendStore();
  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [friendList, setFriendList] = useState([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  if (successMessage !== "") {
    // window.location.reload();
  }

  useEffect(() => {
    // 아이템샵 목록을 불러오는 API 호출
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/itemshop`)
      .then((res) => {
        // 아이템 목록을 상태에 설정
        setItemList(res.data.data.itemList);
        setSuccessMessage("아이템 목록을 불러왔습니다.");
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

  return (
    <>
      <div className="text-3xl mb-10 flex">
        {/* <img src="/image/itemShop.png" className="h-[50px] w-[50px]" /> */}
        <p className="grid place-items-center ml-2 font-bold">아이템샵</p>
      </div>
      {itemList && itemList.length > 0 && (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-4 row-auto w-[1000px] h-[900px]">
            {itemList.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                {item.itemName === "칭호 지정권" && (
                  <WriteAlias
                    itemName={item.itemName}
                    itemPrice={item.itemPrice}
                    itemDesc={item.itemDesc}
                    myPoint={point}
                    friends={friendList}
                  />
                )}
                {item.itemName === "도감 삭제권" && (
                  <DeleteCollection
                    itemName={item.itemName}
                    itemPrice={item.itemPrice}
                    // itemDesc={item.itemDesc}
                    myPoint={point}
                  />
                )}
                {item.itemName === "강제 칭찬권" && (
                  <Compliment
                    itemName={item.itemName}
                    itemPrice={item.itemPrice}
                    // itemDesc={item.itemDesc}
                    myPoint={point}
                    friends={friendList}
                  />
                )}
                {item.itemName === "확성기" && (
                  <Speaker
                    itemName={item.itemName}
                    itemPrice={item.itemPrice}
                    // itemDesc={item.itemDesc}
                    myPoint={point}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
