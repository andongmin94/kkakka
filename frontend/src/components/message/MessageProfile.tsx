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
    <div className="mr-10">
      <Skeleton
        className="w-16 h-16 rounded-full border-2 border-zinc-200"
        style={{
          backgroundImage: `url(${friendImgUrl})`,
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
