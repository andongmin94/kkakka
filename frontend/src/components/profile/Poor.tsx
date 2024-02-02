import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Poor() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="m-2 w-[100px] h-[50px] bg-[url('/image/poor.png')] bg-cover rounded-md" />
        </TooltipTrigger>
        <TooltipContent className="text-xl font-bold text-red-500">
          파산
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
