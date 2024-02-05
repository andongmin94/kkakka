import FriendsCard from "./friendsSidebar/FriendsCard";
import classes from "@/components/navbar/FriendsBtn.module.css";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import axios from "axios";
import { FriendType } from "@/types/friendTypes";

export default function FriendsBtn() {
  const [friends, setFriends] = useState<FriendType[] | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/friends`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.data.friendList);
        setFriends(res.data.data.friendList);
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
            {friends &&
              Array.isArray(friends) &&
              friends.map((friend, idx) => {
                return <FriendsCard key={idx} info={friend} />;
              })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

// 친구 카드 여러개를 띄우기 위한 더미 데이터

// const friendsInfo = [
//   {
//     name: "김상훈",
//     alias: "인의동손잭스",
//     status: "플레이 중",
//     image: "/image/profileImage.png",
//   },
//   {
//     name: "이수민",
//     alias: "냥냥펀치냥냥",
//     status: "플레이 중",
//     image: "/image/profileImage.png",
//   },
//   {
//     name: "이해건",
//     alias: "이해건삼해건",
//     status: "플레이 중",
//     image: "/image/profileImage.png",
//   },
//   {
//     name: "이해건2",
//     alias: "이해건삼해건",
//     status: "플레이 중",
//     image: "/image/profileImage.png",
//   },
//   {
//     name: "이해건3",
//     alias: "이해건삼해건",
//     status: "플레이 중",
//     image: "/image/profileImage.png",
//   },
// ];
