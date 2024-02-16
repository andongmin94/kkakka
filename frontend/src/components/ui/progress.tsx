import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <div
    //className="fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 "
    style={{ zIndex: 5 }}
  >
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "h-4 w-20 overflow-hidden rounded-sm bg-gradient-to-r from-red-200 to-red-400",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-gradient-to-l from-blue-300 to-blue-500 transition-all "
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  </div>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
