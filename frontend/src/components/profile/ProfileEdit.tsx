import { useState, useEffect } from "react";
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
import axios from "axios";
import { UserType } from "@/types/userTypes";

export default function ProfileEdit() {
  const [myData, setMyData] = useState<UserType | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/data`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setMyData(res.data.data);
      });
  }, []);

  const [profileImg, setProfileImg] = useState(null);
  const [backImg, setBackImg] = useState(null);

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
          setProfileImg(reader.result || profileImg); // 프로필 사진
        } else {
          setBackImg(reader.result || backImg); // 프로필 배경
        }
        resolve();
      };
    });
  };

  const [riotId, setRiotId] = useState(null);
  const lolIdHandler = (e: any) => {
    setRiotId(e.target.value);
  };

  console.log("라이엇", riotId);
  console.log("프로필", profileImg);
  console.log("배경", backImg);
  const profileEditHandler = () => {
    axios
      .put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/profile-edit`,
        {
          riotId: riotId,
          profileImg: profileImg,
          backImg: backImg,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <>
      <PC>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="submit"
              variant="secondary"
              className="mr-1 border-solid border-2 border-inherit font-bold text-lg mt-2 h-[50px]"
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
                <Input
                  id="text"
                  placeholder={myData?.riotId}
                  onChange={lolIdHandler}
                />
              </div>
              {/* 프로필 사진 */}
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
                <Label htmlFor="picture" className="font-bold">
                  프로필 사진
                </Label>
                <Input
                  id="picture"
                  type="file"
                  onChange={(e) => imgUpload(e, 1)}
                />
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
                {profileImg ? (
                  <img
                    src={profileImg}
                    className="h-20 w-20 rounded-lg border-2"
                  />
                ) : (
                  <div className="flex justify-center items-center border-2 h-20 w-20 rounded-lg">
                    프사없음
                  </div>
                )}
                {backImg ? (
                  <img
                    src={backImg}
                    className="h-20 w-20 rounded-lg border-2"
                  />
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
                    onClick={profileEditHandler}
                  >
                    저장하기
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </PC>

      {/* ------------------------------------------------------- */}

      <Mobile>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="submit"
              variant="secondary"
              className="mr-1 border-solid border-2 border-inherit font-bold text-lg mt-2 h-[50px]"
            >
              프로필 편집
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[425px] rounded-xl">
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
                <Input
                  id="picture"
                  type="file"
                  onChange={(e) => imgUpload(e, 1)}
                />
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
                {profileImg ? (
                  <img
                    src={profileImg}
                    className="h-20 w-20 rounded-lg border-2"
                  />
                ) : (
                  <div className="flex justify-center items-center border-2 h-20 w-20 rounded-lg">
                    프사없음
                  </div>
                )}
                {backImg ? (
                  <img
                    src={backImg}
                    className="h-20 w-20 rounded-lg border-2"
                  />
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
      </Mobile>
    </>
  );
}
