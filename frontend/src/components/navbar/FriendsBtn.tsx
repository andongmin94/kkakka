import FriendsCard from "./friendsSidebar/FriendsCard";
import classes from "@/components/navbar/FriendsBtn.module.css";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";
import { useEffect, useState } from "react";
// import useFriendStore from "@/store/friend/friendStore";
import { FriendType } from "@/types/friendTypes";

export default function FriendsBtn() {
  // const { friendList } = useFriendStore();
  const [friendList, setFriendList] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/friends`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("친구목록", res.data.data.friendList);
        setFriendList(res.data.data.friendList);
      })
      .catch((error) => {
        console.error("친구목록을 불러오는 중 에러 발생:", error);
      });
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <div className={classes.friends_image} />
      </SheetTrigger>

      <SheetContent className="">
        <SheetHeader>
          <SheetTitle className="grid place-items-center p-3 text-sm font-black rounded-lg shadow-md shadow-slate-300 mt-4 mx-2 bg-gray-300">
            <p>친구 목록</p>
          </SheetTitle>
          <div className={classes.scrollbar}>
            {/* 친구 카드 생성 */}
            {friendList.map((friend: FriendType) => {
              return <FriendsCard key={friend.userId} info={friend} />;
            })}
            <div className="text-xs h-40 flex pt-6 justify-center ">
              더이상 친구가 없어요 ... 😭
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
