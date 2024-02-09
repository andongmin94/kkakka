import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-md", className)} {...props} />;
}

interface info {
  image: string;
}

export default function FriendsProfile({ image }: info) {
  return (
    <div className="flex items-center space-x-3">
      <Skeleton
        className={`w-[100px] h-[100px] rounded-full border-4 bg-cover`}
        style={{
          backgroundImage: `url("${image}")`,
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
