import { cn } from "@/lib/utils";
import classes from "./LiveProfile.module.css";

interface LiveProfileProps {
  playerName: string;
  roomTitle: string;
  playerProfilePic: string;
}

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-md", className)} {...props} />;
}

export default function LiveProfile({
  playerName,
  roomTitle,
  playerProfilePic,
}: LiveProfileProps) {
  return (
    <div>
      <div className="flex items-center">
        <Skeleton
          className={`w-[80px] h-[80px] rounded-full border-4 ${classes.animatedBorder} shadow-md mr-2`}
          style={{
            backgroundImage: `url("${playerProfilePic}")`,
            backgroundSize: "cover",
          }}
        />
        <div className=" w-fit rounded-md text-xs bg-opacity-50 text-white p-1 mt-14">
          {playerName} playing
        </div>
      </div>
      <div className="space-x-3">
        <div className="space-y-2">
          <Skeleton className="h-[60px] grid grid-rows-1 place-items-stretch mt-5">
            {/* 제목 칸 */}
            <div
              className=" text-2xl px-1 overflow-hidden text-slate-100 font-bold"
              style={{ textShadow: "0px 2px 5px rgba(0, 0, 0, 1)" }}
            >
              {roomTitle}
            </div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
