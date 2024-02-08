import { Mobile, PC } from "../MediaQuery";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";

// interface dataProps {
//   userId: string;
//   name: string;
//   msgUserProfile: string;
//   img: any;
//   content: string;
// }

// interface PictureProps {
//   setMessageList: any;
// }

// 임시 데이터
// 사진 보내는 사람
const id = "1";
const profile = "/image/joinSample.png";
const name = "이해건";

export default function Picture({ setMessages }: any) {
  const [image, setImage]: any = useState(null);
  return (
    <>
      {/* 피시 화면 */}
      <PC>
        <Dialog>
          <DialogTrigger asChild>
            {/*  사진 버튼 */}
            <button>
              <img
                src="/image/messagePicture.png"
                className="h-[50px] w-[50px]"
              />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>이미지 선택</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col w-full mb-5 mt-5">
              {/* 이미지 선택 모달 */}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture2" className="font-bold">
                  이미지 파일을 선택하세요
                </Label>
                <Input
                  id="picture2"
                  type="file"
                  // 이미지 파일만 선택되게
                  accept="image/*"
                  onChange={(e) => {
                    // 파일 미리보기 and url 형식으로 변환 작업
                    const file = e.target.files?.[0];
                    const reader = new FileReader();
                    if (file) {
                      reader.readAsDataURL(file);
                      return new Promise<void>((resolve) => {
                        reader.onload = () => {
                          // 변환 이미지 저장
                          setImage(reader.result || null);
                          resolve();
                        };
                      });
                    }
                  }}
                />
              </div>
            </div>

            {/* 하단 부분 */}
            <div className="flex justify-between items-center">
              <div className="flex gap-x-5">
                {image ? (
                  <img
                    src={image}
                    className="h-20 w-[100px] rounded-lg border-2"
                  />
                ) : (
                  <div className="flex justify-center items-center border-2 h-20 w-[100px]  rounded-lg">
                    이미지 없음
                  </div>
                )}
              </div>
              <div>
                <DialogClose asChild>
                  {/* 이미지 보내기 버튼 */}
                  <Button
                    type="submit"
                    variant="secondary"
                    className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px]"
                    onClick={(_) => {
                      //   이미지는 url 형식임
                      if (image) {
                        const data = {
                          // 보내는 사람 아이디
                          userId: id,
                          // 보내는 사람 이름
                          name: name,
                          //   보내는 사람 프사
                          msgUserProfile: profile,
                          //   선택한 이미지 url
                          img: image,
                          //   채팅이 아니고 이미지니깐 '' 빈문자열로
                          content: "",
                        };
                        setMessages((pre: any) => pre.concat(data));
                        // 초기화
                        setImage(null);
                      }
                    }}
                  >
                    보내기
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </PC>

      {/* ---------------------------------------------------------------------------- */}

      {/* 모바일 화면 */}
      <Mobile>
        <></>
      </Mobile>
    </>
  );
}
