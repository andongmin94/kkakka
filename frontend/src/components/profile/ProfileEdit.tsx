import { useState } from "react";
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
  const userprofileImage = userInfo.userProfileImg;
  const token = localStorage.getItem("token");

  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(
    userprofileImage
  );

  const [profileFile, setProfileFile] = useState<string | ArrayBuffer | null>(
    userprofileImage
  );

  // 미리보기 이미지 프로세싱
  const processFile = (
    currentFile: File
  ): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(currentFile);
      reader.onload = () => {
        const result = reader.result;
        resolve(result);
      };
    });
  };

  const parseFile = async (currentFile: File) => {
    const parsedFile: string | ArrayBuffer | null = await processFile(
      currentFile
    );
    return parsedFile;
  };

  // 파일을 선택했을때 저장
  const imgUpload = (e: any, check: number) => {
    const file = e.target.files[0];
    const previewSrc = parseFile(file);

    previewSrc.then((res) => {
      if (check === 1) {
        // 이미지를 Blob으로 변환
        setProfileImg(res);
        const blob = dataURItoBlob(res);
        const pFile = new File([blob], "profileImage.jpg", {
          type: "image/jpeg",
        });
        setProfileFile(pFile);
      }
    });
  };

  // Data URI를 Blob으로 변환하는 함수
  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  const [riotId, setRiotId] = useState(null);
  const lolIdHandler = (e: any) => {
    setRiotId(e.target.value);
  };

  console.log("라이엇", riotId);
  console.log("프로필", profileImg);

  const profileEditHandler = () => {
    const formData = new FormData();
    if (profileFile) {
      formData.append("profileImg", profileFile);
    }
    if (riotId !== null) {
      formData.append("riotId", riotId);
    }
    axios
      .put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/profile-edit`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.alert("수정되었습니다.");
      })
      .then(() => {
        window.location.reload();
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
              <DialogTitle>프로필 편집</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col w-full mb-5">
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-6 mt-4">
                <Label htmlFor="text" className="font-bold mb-1">
                  롤 아이디
                </Label>
                <Input
                  id="text"
                  placeholder={userInfo.riotId ? userInfo.riotId : ""}
                  onChange={lolIdHandler}
                />
              </div>
              {/* 프로필 사진 */}
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
                <Label htmlFor="picture" className="font-bold mb-1">
                  프로필 사진
                </Label>
                <Input
                  id="picture"
                  type="file"
                  onChange={(e) => imgUpload(e, 1)}
                />
              </div>
            </div>

            {/* 하단 부분 */}
            <div className="flex justify-between">
              <div className="flex ">
                {profileImg ? (
                  <div
                    style={{
                      backgroundImage: `url("${profileImg}")`,
                      backgroundSize: "cover",
                    }}
                    className="h-20 w-20 rounded-lg border-2 mr-2"
                  />
                ) : (
                  <div className=" flex items-center border-2 h-20 w-20 rounded-lg text-xs p-2 mr-2">
                    선택한 프로필 이미지가 없습니다.
                  </div>
                )}
              </div>
              <div>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    className="mr-1 bg-blue-500 font-bold text-xs mt-2"
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
                <Input
                  id="text"
                  placeholder={userInfo.riotId ? userInfo.riotId : ""}
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
            </div>

            {/* 하단 부분 */}
            <div className="flex justify-between items-center">
              <div className="flex gap-x-5">
                {profileImg ? (
                  <div
                    style={{
                      backgroundImage: `url("${profileImg}")`,
                      backgroundSize: "cover",
                    }}
                    className="h-20 w-20 rounded-lg border-2"
                  />
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
