import { cn } from "@/lib/utils";

interface LiveProfileProps {
  userId: number;
  text: string;
  profileImage: string;
}

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-md", className)} {...props} />;
}

export default function LiveProfile({ text, profileImage }: LiveProfileProps) {
  return (
    <div className="flex items-center space-x-3">
      <Skeleton
        className={`w-[80px] h-[80px] rounded-full border-4  border-red-500 bg-[url('${profileImage}')] bg-cover`}
      />
      <div className="space-y-2">
        <Skeleton className="h-auto grid grid-rows-1 place-items-stretch w-[250px]">
          {/* 제목 칸 */}
          <div className="self-center text-2xl px-1 overflow-hidden font-bold">
            {text}
          </div>
        </Skeleton>
      </div>
    </div>
  );
}
