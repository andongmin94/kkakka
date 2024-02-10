import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-md", className)} {...props} />;
}

export default function MessageProfile({
  friendImgUrl,
}: {
  friendImgUrl: string;
}) {
  return (
    <div className="flex items-center space-x-3">
      <Skeleton
        className="w-[80px] h-[80px] rounded-full "
        style={{
          backgroundImage: `url(${friendImgUrl})`,
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
