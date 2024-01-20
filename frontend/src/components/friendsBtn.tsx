import FriendsCard from "@/components/FriendsCard";
import classes from "@/components/FriendsBtn.module.css";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// 친구 카드 여러개를 띄우기 위한 더미 데이터
const data: number[] = [1, 2, 3, 4, 5, 6];

export default function FriendsBtn() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className={classes.friends_image} />
      </SheetTrigger>

      <SheetContent className="p-0">
        <SheetHeader>
          <SheetTitle className="grid place-items-center text-2xl border-2 rounded-lg shadow-xl mt-[6px] mx-1 bg-[#f14e4e91]">
            <p>친구목록</p>
          </SheetTitle>
          <div className={classes.scrollbar}>
            {/* 친구 카드 생성 */}
            {data.map((_, idx) => {
              return <FriendsCard key={idx} />;
            })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
