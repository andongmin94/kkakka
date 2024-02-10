import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-md", className)} {...props} />;
}

export default function MessageProfile() {
  return (
    <div className="flex items-center space-x-3">
      <Skeleton
        className="w-[80px] h-[80px] rounded-full border-4  border-red-500"
        style={{
          backgroundImage: `url("/image/profile.png")`,
        }}
      />
    </div>
  );
}
