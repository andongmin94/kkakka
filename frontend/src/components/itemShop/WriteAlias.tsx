import * as z from "zod";
import { useState, useRef } from "react";
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
import { FriendType } from "@/types/friendTypes";
// import { useBuyWriteAliasPost } from "@/hooks/itemshop/mutations/useBuyWritealiasPost";
import classes from "./ItemShopCard.module.css";
import axios from "axios";
const FormSchema = z.object({
  userId: z.number(),
  textAlias: z
    .string()
    .min(1, {
      message: "칭호를 입력해주세요!",
    })
    .max(6, {
      message: "6글자 미만으로 입력해주세요!",
    }),
  name: z.string({
    required_error: "친구를 선택하세요!",
  }),
});

export default function WriteAlias({
  itemName,
  itemPrice,
  itemDesc,
  myPoint,
  friends,
  setParentPoint,
}: {
  itemName: string;
  itemPrice: number;
  itemDesc: string;
  myPoint: number;
  friends: FriendType[];
  setParentPoint: (point: number) => void;
}) {
  // 콤보박스 누르면 꺼지게 하는 상태정보
  const [open, setOpen] = useState(false);

  // 구매 버튼 누를때 유효한 입력값일때만 꺼지게 하는 상태정보
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit() {
    toast({
      title: "아이템 구매",
      description: "친구의 칭호가 변경되었습니다.",
      // description: (
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //   </pre>
      // ),
    });
  }

  interface dataType {
    userId: number;
    textAlias: string;
    name: string;
  }

  // 구입 api 요청하기
  const itemBuyHandler = (data: dataType) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/alias?receiver-id=${
          data.userId
        }`,
        {
          aliasName: data.textAlias,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setParentPoint(myPoint - itemPrice);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Item Card CSS 세팅
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (cardRef.current != null) {
  //     // cardRef.current.style.backgroundImage = `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfP6YEtvDE4IhCTv0534ffLaaVFlE8RB34Uw&usqp=CAU')`;
  //   }
  // });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && overlayRef.current) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const rotateY = (-1 / 5) * x + 20;
      const rotateX = (4 / 30) * y - 20;

      <div className="opacity-50 absolute top-[-4px] right-[-4px] border-solid border-4 rounded-3xl bg-slate-400 h-[23rem] w-[23rem] group/edit invisible group-hover/item:visible" />;
      overlayRef.current.style.filter = "opacity(10)";
      overlayRef.current.style.backgroundPosition = `${260 - 2 * x}% ${
        320 - 2 * y
      }%`;

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
            className={`${classes.itemElemContainer} bg-gradient-to-r from-amber-200 to-amber-600 rounded-[3%]`}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
          >
            <div
              className={`${classes.itemElemOverlayBronze}`}
              ref={overlayRef}
            ></div>
            <div className={`${classes.itemElemCard}`} ref={cardRef}>
              <div className="text-lg">👑</div>
              <h1 className={`${classes.itemElemContent}`}>칭호지정권</h1>
            </div>
          </div>
        </DialogTrigger>

        {/* 모달 부분 */}
        <DialogContent className="sm:max-w-[480px]">
          {/* 헤더 */}
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center text-3xl">
              <div className="mb-3 text-xl border-b-4 w-fit pb-2">
                {itemName} 👑
              </div>
              <div className="mt-3 mb-6 w-[80%] text-sm ">{itemDesc}</div>
              <div className="rounded-xl h-[4rem] w-[15rem] grid place-items-center bg-white">
                <div className="flex flex-row justify-content-center gap-4 bg-gray-200 p-3 rounded-lg">
                  <div>💵</div>
                  <span className="self-center text-2xl font-bold mr-1">
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
                                    // 콤보박스에 선택한 값이 들어가도록 하는 것
                                    form.setValue("name", friend.name);
                                    form.setValue("userId", friend.userId);
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
                  name="textAlias"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        칭호를 입력하세요
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
                <div className="font-bold text-center mb-3 bg-gray-200 rounded-lg mx-3 py-3">
                  <div>구입 후 잔여 포인트</div>{" "}
                  <div>💰 {myPoint - itemPrice} </div>
                </div>

                <DialogFooter className="flex sm:justify-center">
                  {/* 취소 버튼 */}
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      className=" bg-red-400 font-bold text-sm shadow-md text-white rounded-lg h-[80%] "
                    >
                      취소
                    </Button>
                  </DialogClose>

                  {/* 구매 버튼 */}
                  <Button
                    type="submit"
                    className=" bg-blue-400 font-bold text-sm shadow-md text-white rounded-lg h-[80%] "
                    onClick={() => {
                      console.log(form.getValues());

                      // 구입 버튼을 누르면 친구의 유저 아이디와 텍스트를 보내준다.
                      // 유효성 검사
                      if (
                        form.getValues().textAlias != undefined &&
                        form.getValues().userId &&
                        form.getValues().textAlias.length > 1 &&
                        form.getValues().textAlias.length < 7
                      ) {
                        // 보낼 데이터 객체 userId, textAlias
                        const data = {
                          userId: form.getValues().userId,
                          name: form.getValues.name,
                          textAlias: form.getValues().textAlias,
                        };
                        // 데이터 보내는거 확인 완료
                        console.log(data);

                        itemBuyHandler(data);
                        setOpenDialog(false);
                      }
                    }}
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
