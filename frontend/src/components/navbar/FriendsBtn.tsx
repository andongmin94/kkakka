import FriendsCard from "./friendsSidebar/FriendsCard";
import classes from "@/components/navbar/FriendsBtn.module.css";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFriendStore } from "@/stores/MainStore";
import { useEffect } from "react";

// 친구 카드 여러개를 띄우기 위한 더미 데이터

const friendsInfo = [
  {
    name: "김상훈",
    alias: "인의동손잭스",
    status: "플레이 중",
    image: "/image/profileImage.png",
  },
  {
    name: "이수민",
    alias: "냥냥펀치냥냥",
    status: "플레이 중",
    image: "/image/profileImage.png",
  },
  {
    name: "이해건",
    alias: "이해건삼해건",
    status: "플레이 중",
    image: "/image/profileImage.png",
  },
  {
    name: "이해건2",
    alias: "이해건삼해건",
    status: "플레이 중",
    image: "/image/profileImage.png",
  },
  {
    name: "이해건3",
    alias: "이해건삼해건",
    status: "플레이 중",
    image: "/image/profileImage.png",
  },
];

export default function FriendsBtn() {
  const { fetchFriends, friends } = useFriendStore();

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

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
            {friends.friendList &&
              Array.isArray(friends.friendList) &&
              friends.friendList.map((friend, idx) => {
                return <FriendsCard key={idx} info={friend} />;
              })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
