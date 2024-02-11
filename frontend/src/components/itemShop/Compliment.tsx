import * as z from "zod";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Check, ChevronsUpDown } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const FormSchema = z.object({
  userId: z.number(),
  name: z.string({
    required_error: "친구를 선택하세요!",
  }),
  textComp: z.string().min(2, {
    message: "2글자 이상으로 입력해주세요!",
  }),
});

import axios from "axios";
import { FriendType } from "@/types/friendTypes";
import { useRef } from "react";
import classes from "./ItemShopCard.module.css";

export default function Compliment({
  itemName,
  itemPrice,
  // itemDesc,
  myPoint,
  friends,
}: {
  itemName: string;
  itemPrice: number;
  // itemDesc: string;
  myPoint: number;
  friends: FriendType[];
}) {
  // 콤보박스 누르면 꺼지게 하는 상태정보
  const [open, setOpen] = React.useState(false);
  // 구매 버튼 누를때 유효한 입력값일때만 꺼지게 하는 상태정보
  const [openDialog, setOpenDialog] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // 구입 버튼을 누르면 친구의 유저 아이디와 텍스트를 보내준다.
    // 유효성 검사
    if (
      data.textComp != undefined &&
      data.userId &&
      data.textComp.length > 1
    ) {
      // 보낼 데이터 객체 userId, textComp
      const requestData = {
        receiverId: data.userId,
        receiverName: data.name,
        enfScript: data.textComp,
      };

      const token = localStorage.getItem("token");

      // 칭찬권 구매
      axios
        .post(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/friends/compliment`,
          {
            enfScript: requestData.enfScript,
          },
          {
            params: {
              "receiver-id": requestData.receiverId,
            },
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          // 칭찬권 구매 성공
          makeToast("강제 칭찬권 구매 성공");
          console.log(res);
        })
        .catch((error) => {
          // 칭찬권 구매 실패
          makeToast("강제 칭찬권 구매 실패");
          console.log(error);
        });

      // 데이터 보내기 확인 완료
      // console.log(data);

      setOpenDialog(false);
    }

  }
  
  const makeToast = (content: string) => {
    toast({
      title: "아이템 구매",
      description: content,
    })
  }

  // Item Card CSS 세팅
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && overlayRef.current) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const rotateY = (-1 / 5) * x + 20;
      const rotateX = (4 / 30) * y - 20;

      overlayRef.current.style.filter = "opacity(10)";
      overlayRef.current.style.backgroundPosition = ` ${160 - x}% ${250 - y}%`;

      containerRef.current.style.transform = `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseOut = () => {
    if (overlayRef.current && containerRef.current) {
      overlayRef.current.style.filter = "opacity(0)";
      containerRef.current.style.transform =
        "perspective(350px) rotateY(0deg) rotateX(0deg)";
    }
  };

  return (
    <Card className="border-0">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <div
            className={`${classes.itemElemContainer}`}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
          >
            <div
              className={`${classes.itemElemOverlay}`}
              ref={overlayRef}
            ></div>
            <div className={`${classes.itemElemCard}`}>
              <h1 className={`${classes.itemElemContent}`}>강제칭찬권</h1>
            </div>
          </div>
        </DialogTrigger>

        {/* 모달 부분 */}
        <DialogContent className="sm:max-w-[480px]">
          {/* 헤더 */}
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center text-3xl">
              <div className="mb-3 text-4xl">{itemName}</div>
              <div className="rounded-xl h-[4rem] w-[15rem] grid place-items-center bg-white">
                <div className="flex flex-row justify-content-center gap-4">
                  <img src="/image/coins.png" className="h-10 w-10" />
                  <span className="self-center text-2xl font-bold">
                    {itemPrice}
                  </span>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* 본문 */}
          <div className="flex flex-col w-full mb-5 mt-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* 콤보박스 부분 */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold">친구 지정</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className={cn(
                                "w-[200px] justify-between font-bold",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? friends.find(
                                    (friend) => friend.name === field.value
                                  )?.name
                                : "친구를 선택하세요"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="친구 검색" />
                            <CommandEmpty>
                              해당하는 친구가 없습니다.
                            </CommandEmpty>
                            <CommandGroup>
                              {friends.map((friend) => (
                                <CommandItem
                                  value={friend.name}
                                  key={friend.userId}
                                  onSelect={() => {
                                    form.setValue("name", friend.name);
                                    form.setValue("userId", friend.userId);
                                    console.log(friend.userId);
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      friend.name === field.name
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {friend.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 텍스트 입력 부분 */}
                <FormField
                  control={form.control}
                  name="textComp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        칭찬을 입력하세요
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          value={field.value || ""}
                          className="font-bold"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="font-bold text-center mb-3">
                  구입 후 잔여 포인트 {myPoint - itemPrice} P
                </div>

                <DialogFooter className="flex sm:justify-center">
                  {/* 취소 버튼 */}
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      className="mr-10 border-solid border-2 border-inherit bg-white font-bold h-8 text-lg"
                    >
                      취소
                    </Button>
                  </DialogClose>

                  {/* 구매 버튼 */}
                  <Button
                    type="submit"
                    variant="secondary"
                    className="mr-10 border-solid border-2 border-inherit bg-white font-bold h-8 text-lg"
                  >
                    구입
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
