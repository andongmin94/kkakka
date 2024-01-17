import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { UsersIcon } from "@heroicons/react/24/outline"
import { UsersIcon as CheckedUsersIcon } from "@heroicons/react/24/solid"

export function SheetDemo() {
    const [isListHover, setIsListHover] = useState(false);
  return (
    <Sheet>
      <SheetTrigger asChild>
      <div
          onMouseOver={() => setIsListHover(true)}
          onMouseOut={() => setIsListHover(false)}
        >
          {isListHover ? (
            <CheckedUsersIcon className="w-10 h-10 ml-8 mr-16" />
          ) : (
            <UsersIcon className="w-10 h-10 ml-8 mr-16" />
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
