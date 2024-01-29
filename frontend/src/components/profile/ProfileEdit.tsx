import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ProfileEdit() {
  // 프로필 사진 저장
  const [profileImage, setProfileImage]: any = useState(null);

  // 프로필 배경 저장 저장
  const [profileBg, setProfileBg]: any = useState(null);

  // 파일을 선택했을때 저장
  const imgUpload = (e: any, check: number) => {
    // 파일 객체를 가져와서
    const file = e.target.files[0];
    const reader = new FileReader();
    // 읽을 수 있게
    reader.readAsDataURL(file);

    // 업로드 되면 보여주기
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        if (check === 1) {
          setProfileImage(reader.result || null); // 프로필 사진
        } else {
          setProfileBg(reader.result || null); // 프로필 배경
        }
        resolve();
      };
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="submit"
          variant="secondary"
          className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px]"
        >
          프로필 편집
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>프로필 편집</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full mb-5 mt-5">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-8 mt-4">
            <Label htmlFor="text" className="font-bold">
              롤 아이디
            </Label>
            <Input id="text" placeholder="기존 아이디 나와야 함" />
          </div>
          {/* 프로필 사진 */}
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
            <Label htmlFor="picture" className="font-bold">
              프로필 사진
            </Label>
            <Input id="picture" type="file" onChange={(e) => imgUpload(e, 1)} />
          </div>
          {/* 프로필 배경 */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture2" className="font-bold">
              프로필 배경
            </Label>
            <Input
              id="picture2"
              type="file"
              onChange={(e) => imgUpload(e, 2)}
            />
          </div>
        </div>

        {/* 하단 부분 */}
        <div className="flex justify-between items-center">
          <div className="flex gap-x-5">
            {profileImage ? (
              <img src={profileImage} className="h-20 w-20 rounded-lg" />
            ) : (
              <div className="flex justify-center items-center border-2 h-20 w-20 rounded-lg">
                프사없음
              </div>
            )}
            {profileBg ? (
              <img src={profileBg} className="h-20 w-20 rounded-lg" />
            ) : (
              <div className="flex justify-center items-center border-2 h-20 w-20 rounded-lg">
                배경없음
              </div>
            )}
          </div>
          <div>
            <DialogClose asChild>
              <Button
                type="submit"
                variant="secondary"
                className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px]"
                onClick={() => {
                  // 저장버튼 눌렀을때 이미지 넘기는거 확인 !
                  // console.log(profileImage);
                }}
              >
                저장하기
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
