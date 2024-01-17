"use client";

import * as React from "react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "@heroicons/react/24/outline";
import { BellIcon as CheckedBellIcon } from "@heroicons/react/24/solid";

export function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = React.useState("");
  const [isListHover, setIsListHover] = useState(false);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          onMouseOver={() => setIsListHover(true)}
          onMouseOut={() => setIsListHover(false)}
          className="w-10 h-10">
          {isListHover ? (
            <CheckedBellIcon />
          ) : (
            <BellIcon />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30 text-center" >
        <DropdownMenuLabel>알림</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          className="w-30"
          value={position}
          onValueChange={setPosition}
        >
          <DropdownMenuRadioItem value="top">알림 1</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">알림 2</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">알림 3</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
