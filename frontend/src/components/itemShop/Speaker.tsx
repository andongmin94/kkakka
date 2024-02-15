import * as z from "zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  textSpeaker: z
    .string()
    .min(2, {
      message: "2글자 이상으로 입력해주세요!",
    })
    .max(100, {
      message: "100글자 미만으로 작성해주세요!",
    }),
});
import axios from "axios";
import { useRef } from "react";
import classes from "./ItemShopCard.module.css";

export default function Speaker({
  itemName,
  itemPrice,
  itemDesc,
  myPoint,
  setParentPoint,
}: {
  itemName: string;
  itemPrice: number;
  itemDesc: string;
  myPoint: number;
  setParentPoint: (point: number) => void;
}) {
  // 구매 버튼 누를때 유효한 입력값일때만 꺼지게 하는 상태정보
  const [openDialog, setOpenDialog] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // 구입 버튼을 누르면 텍스트를 보내준다.
    // 유효성 검사
    if (data.textSpeaker != undefined && data.textSpeaker.length > 1) {
      const token = localStorage.getItem("token");

      // 확성기 구매
      axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/friends/megaphone`,
          {
            content: data.textSpeaker,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          // 확성기 구매 성공
          makeToast("확성기 구매 성공");
          console.log(res);
          setParentPoint(myPoint - itemPrice);
        })
        .catch((error) => {
          // 확성기 구매 실패
          makeToast("확성기 구매 실패");
          console.log(error);
        });

      // 데이터 보내는거 확인 완료
      // console.log(data);
      setOpenDialog(false);
    } else {
      console.log("유효성 검사 실패");
    }
  }

  // Item Card CSS 세팅
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (cardRef.current != null) {
  //     // cardRef.current.style.backgroundImage = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAAEsCAMAAABgwwj8AAAAA1BMVEUTJ0OMCoK8AAAASElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+BsYMAAFjd3WkAAAAAElFTkSuQmCC')`;
  //   }
  // });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && overlayRef.current) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const rotateY = (-1 / 5) * x + 20;
      const rotateX = (4 / 30) * y - 20;

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

  const makeToast = (content: string) => {
    // 개인 포인트 조회
    // const token = localStorage.getItem("token");

    // axios
    // .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/point`, {
    //   headers: {
    //     Authorization: token,
    //   },
    // })
    // .then((res) => {
    //   console.log("포인트조회", res.data.data.Point);
    //   setMyPoint(res.data.data.Point);
    // });

    toast({
      title: "아이템 구매",
      description: content,
    });
  };

  return (
    <Card className="border-0">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <div
            className={`${classes.itemElemContainer} bg-gradient-to-r from-rose-200  to-amber-800 rounded-[3%]`}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
          >
            <div
              className={`${classes.itemElemOverlayBronze}`}
              ref={overlayRef}
            ></div>
            <div className={`${classes.itemElemCard}`} ref={cardRef}>
              <div className="text-lg">📢</div>

              <h1 className={`${classes.itemElemContent}`}>확성기</h1>
            </div>
          </div>
        </DialogTrigger>

        {/* 모달 부분 */}
        <DialogContent className="sm:max-w-[480px]">
          {/* 헤더 */}
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center text-3xl">
              <div className="mb-3 text-xl border-b-4 w-fit pb-2">
                {itemName} 📢
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
                {/* 텍스트 입력 부분 */}
                <FormField
                  control={form.control}
                  name="textSpeaker"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        내용을 입력하세요
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
