import FriendsCard from "./friendsSidebar/FriendsCard";
import classes from "@/components/navbar/FriendsBtn.module.css";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useEffect } from "react";
import useFriendStore from "@/store/friend/friendStore";
import { useFriendList } from "@/hooks/friend/queries/useFriendListQuery";

export default function FriendsBtn() {
  const { friendList, setFriendList } = useFriendStore();
  const { useFriendListQuery } = useFriendList();
  const { data: friendListData } = useFriendListQuery();

  useEffect(() => {
    if (friendListData) {
      setFriendList(friendListData);
    } else {
      console.log("친구 목록 없음");
    }
  }, [friendListData, setFriendList]);

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
            {friendList.map((friend) => {
              return <FriendsCard key={friend.id} info={friend} />;
            })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
