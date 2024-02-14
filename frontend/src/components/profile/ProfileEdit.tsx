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
import useUserStore from "@/store/user/userStore";

export default function ProfileEdit() {
  const { userInfo } = useUserStore();
  const token = localStorage.getItem("token");
  const userProfileImg = localStorage.getItem("userProfileImg");

  const [riotId, setRiotId] = useState(userInfo.riotId || "");
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [previewProfileImg, setPreviewProfileImg] = useState<string | null>(
    userProfileImg
  );

  useEffect(() => {
    if (!profileImg && userProfileImg && !isImageUrl(userProfileImg)) {
      setPreviewProfileImg(userProfileImg);
    }
  }, [profileImg, userProfileImg]);

  const isImageUrl = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
  };

  const onProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImg(file);
      setPreviewProfileImg(URL.createObjectURL(file));
    }
  };

  const profileEditHandler = () => {
    const formData = new FormData();
    if (profileImg) {
      formData.append("profileImg", profileImg);
    }
    formData.append("riotId", riotId);

    axios
      .put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/profile-edit`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.alert("수정되었습니다.");
        localStorage.setItem("userProfileImg", res.data.data.profileImg);
        window.location.reload();
      })
      .catch((error) => {
        console.error("프로필 수정 중 오류 발생:", error);
        window.alert("프로필 수정 중 오류가 발생했습니다.");
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
              className="mr-1 font-bold bg-white text-xs"
            >
              프로필 편집
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className=" border-b-4 w-fit pb-2">
                프로필 편집
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col w-full mb-5">
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-6 mt-4">
                <Label htmlFor="text" className="font-bold mb-1">
                  롤 아이디
                </Label>
                <Input
                  id="text"
                  value={riotId}
                  onChange={(e) => setRiotId(e.target.value)}
                />
              </div>
              {/* 프로필 사진 */}
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
                <Label htmlFor="picture" className="font-bold mb-1">
                  프로필 사진
                </Label>
                <Input id="picture" type="file" onChange={onProfileImgChange} />
              </div>
            </div>

            {/* 하단 부분 */}
            <div className="flex justify-between">
              <div className="flex ">
                {previewProfileImg ? (
                  isImageUrl(previewProfileImg) ? (
                    <div
                      className="h-20 w-20 rounded-lg border-2 mr-2"
                      style={{
                        backgroundImage: `url(${previewProfileImg})`,
                        backgroundSize: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src={previewProfileImg}
                      alt="프로필 사진"
                      className="h-20 w-20 rounded-lg border-2 mr-2"
                    />
                  )
                ) : (
                  <div className="flex items-center border-2 h-20 w-20 rounded-lg text-xs p-2 mr-2">
                    선택한 프로필 이미지가 없습니다.
                  </div>
                )}
              </div>
              <div>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    className="mr-1 bg-blue-500 font-bold text-xs mt-10"
                    onClick={profileEditHandler}
                  >
                    저장
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
              className="mr-1 border-solid border-2 border-inherit font-bold text-lg mt-2 h-[50px] "
            >
              프로필 편집
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[425px] rounded-xl">
            <DialogHeader>
              <DialogTitle className=" border-b-4 w-fit pb-2">
                프로필 편집
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col w-full mb-5 mt-5">
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-8 mt-4">
                <Label htmlFor="text" className="font-bold">
                  롤 아이디
                </Label>
                <Input
                  id="text"
                  value={riotId}
                  onChange={(e) => setRiotId(e.target.value)}
                />
              </div>
              {/* 프로필 사진 */}
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
                <Label htmlFor="picture" className="font-bold">
                  프로필 사진
                </Label>
                <Input id="picture" type="file" onChange={onProfileImgChange} />
              </div>
            </div>

            {/* 하단 부분 */}
            <div className="flex justify-between items-center">
              <div className="flex gap-x-5">
                {previewProfileImg ? (
                  isImageUrl(previewProfileImg) ? (
                    <div
                      className="h-20 w-20 rounded-lg border-2"
                      style={{
                        backgroundImage: `url(${previewProfileImg})`,
                        backgroundSize: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src={previewProfileImg}
                      alt="프로필 사진"
                      className="h-20 w-20 rounded-lg border-2"
                    />
                  )
                ) : (
                  <div className="flex justify-center items-center border-2 h-20 w-20 rounded-lg">
                    프사없음
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
      </Mobile>
    </>
  );
}
