import * as z from "zod";
import Price from "./Price";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Purchase from "./Purchase";
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
import axios from "axios";
import { FriendType } from "@/types/friendTypes";

const FormSchema = z.object({
  userId: z.number(),
  textAlias: z.string().max(6, {
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
}: {
  itemName: string;
  itemPrice: number;
  itemDesc: string;
  myPoint: number;
  friends: FriendType[];
}) {

  console.log("칭호 부분으로 넘어온 친구 리스트: " , friends)

  // 콤보박스 누르면 꺼지게 하는 상태정보
  const [open, setOpen] = useState(false);

  // 구매 버튼 누를때 유효한 입력값일때만 꺼지게 하는 상태정보
  const [openDialog, setOpenDialog] = useState(false);

  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Card className="static group/item bg-[url('/image/whriteAliasBg.png')] border-solid border-4 rounded-3xl bg-cover h-[23rem] w-[23rem] lg:hover:scale-105 transition-transform ease-in-out duration-500">
      <div className="flex flex-col items-center">
        <img src="/image/whriteAlias.png" className="h-20 w-20" />
        <p className="text-4xl mt-3 font-bold text-white">{itemName}</p>
        <p className="text-xl mt-10 font-bold text-white mx-10">{itemDesc}</p>
      </div>

      {/* 호버 */}
      <div className="opacity-50 absolute top-[-4px] right-[-4px] border-solid border-4 rounded-3xl bg-slate-400 h-[23rem] w-[23rem] group/edit invisible group-hover/item:visible" />
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <div className="group/edit invisible group-hover/item:visible h-[23rem] w-[23rem] grid place-items-center z-10">
            {/* 호버 가격 버튼 */}
            <Price itemPrice={itemPrice} />

            {/* 호버 구매하기 버튼 */}
            <Purchase />
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
                              {
                              field.value
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
                                  key={friend.id}
                                  onSelect={() => {
                                    // 콤보박스에 선택한 값이 들어가도록 하는 것 
                                    form.setValue("name", friend.name);
                                    form.setValue("userId", friend.userId);
                                    console.log(friend.id);
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
                    onClick={() => {

                      console.log(form.getValues())

                      // 구입 버튼을 누르면 친구의 유저 아이디와 텍스트를 보내준다.
                      // 유효성 검사
                      if (
                        form.getValues().textAlias != undefined &&
                        form.getValues().userId &&
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

                         const token = localStorage.getItem("token");
                        axios
                        .post(`${import.meta.env.VITE_API_BASE_URL}/api/friends/alias?receiver-id=${data.userId}`,{
                          aliasName: data.textAlias
                        } , {
                          headers: {
                            Authorization: token,
                          },
                        }).then((res) => {
                          console.log(res)
                        })
                        .catch((error) => {
                          console.log(error)
                        })
                        ; 


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

// 친구 더미 데이터
// const userId = [
//   { label: "이수민", value: "1" },
//   { label: "오세영", value: "2" },
//   { label: "김지연", value: "3" },
//   { label: "전수민", value: "4" },
//   { label: "김상훈", value: "5" },
//   { label: "이해건", value: "6" },
// ] as const;
