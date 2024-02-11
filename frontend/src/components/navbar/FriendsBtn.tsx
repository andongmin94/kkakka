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

      <SheetContent className="p-0">
        <SheetHeader>
          <SheetTitle className="grid place-items-center text-2xl border-2 rounded-lg shadow-xl mt-[6px] mx-1 bg-red-200">
            <p>친구목록</p>
          </SheetTitle>
          <div className={classes.scrollbar}>
            {/* 친구 카드 생성 */}
            {friendList.map((friend: FriendType) => {
              return <FriendsCard key={friend.userId} info={friend} />;
            })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
