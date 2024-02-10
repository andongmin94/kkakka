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
import { useAddDogamPost } from "@/hooks/profile/mutations/useAddDogamPost";
import { axiosInstance } from "@/utils/axios";

export default function AddCollection({ userId }: { userId: number }) {
  // 프로필 사진 저장
  const [dogamImage, setDogamImage] = useState("");

  // // 파일을 선택했을때 저장
  // const imgUpload = (e: any) => {
  //   // 파일 객체를 가져와서
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   // 읽을 수 있게
  //   reader.readAsDataURL(file);

  //   // 업로드 되면 보여주기
  //   return new Promise<void>((resolve) => {
  //     reader.onload = () => {
  //       setDogamImage(reader.result); // 프로필 사진
  //       resolve();
  //     };
  //   });
  // };

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
  const imgUpload = (e: any) => {
    const file = e.target.files[0];
    const previewSrc = parseFile(file);

    previewSrc.then((res) => {
      return setDogamImage(res);
    });
  };

  console.log("이미지", dogamImage);

  const [dogamTitle, setDogamTitle] = useState();

  const handleInputChange = (e: any) => {
    setDogamTitle(e.target.value);
  };

  // const mutation = useAddDogamPost(userId, data);

  const addDogamHandler = async () => {
    const formData = new FormData();
    formData.append("imgUrl", dogamImage);
    formData.append("dogamTitle", dogamTitle!);

    console.log("폼", formData.get("imgUrl"));

    const res = await axiosInstance.post(
      `/api/friends/dogam?friend-user-id=${userId}`,
      {
        formData,
      }
    );
  };

  return (
    <>
      <PC>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-bold text-2xl flex self-center w-[250px]">
              도감 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>도감 추가</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col w-full mt-5">
              <div className="flex gap-x-5 justify-center">
                {dogamImage ? (
                  <img
                    src={dogamImage}
                    className="rounded-lg bg-cover h-[200px] w-[320px] border-2"
                  />
                ) : (
                  <Label
                    className="flex justify-center items-center border-2 h-[200px] w-[320px] rounded-lg"
                    htmlFor="picture"
                  >
                    프사없음
                  </Label>
                )}
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-8 mt-4">
                <Label htmlFor="text" className="font-bold">
                  제목
                </Label>
                <Input id="text" placeholder="제목을 입력해주세요" />
              </div>
              {/* 프로필 사진 */}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="font-bold">프로필 사진</Label>
                <Input
                  id="picture"
                  type="file"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            {/* 하단 부분 */}
            <div className="flex justify-center items-center">
              <DialogClose asChild>
                <Button
                  type="submit"
                  variant="secondary"
                  className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px]"
                  onClick={() => {
                    addDogamHandler();
                  }}
                >
                  저장하기
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </PC>

      {/* ------------------------------------- */}

      <Mobile>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-bold text-2xl flex self-center w-[80px] h-[50px] rounded-full hover:scale-110 transition-transform ease-in-out duration-500">
              도감 +
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[425px] rounded-xl">
            <DialogHeader>
              <DialogTitle>도감 추가</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col w-full mt-5">
              <div className="flex gap-x-5 justify-center">
                {dogamImage ? (
                  <img
                    src={dogamImage}
                    className="rounded-lg bg-cover h-[200px] w-[320px] border-2"
                  />
                ) : (
                  <Label
                    className="flex justify-center items-center border-2 h-[200px] w-[320px] rounded-lg"
                    htmlFor="picture"
                  >
                    프사없음
                  </Label>
                )}
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-8 mt-4">
                <Label htmlFor="text" className="font-bold">
                  제목
                </Label>
                <Input id="text" placeholder="제목을 입력해주세요" />
              </div>
              {/* 프로필 사진 */}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="font-bold">프로필 사진</Label>
                <Input
                  id="picture"
                  type="file"
                  onChange={(e) => imgUpload(e)}
                />
              </div>
            </div>

            {/* 하단 부분 */}
            <div className="flex justify-center items-center">
              <DialogClose asChild>
                <Button
                  type="submit"
                  variant="secondary"
                  className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px]"
                  onClick={() => {
                    addDogamHandler();
                  }}
                >
                  저장하기
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </Mobile>
    </>
  );
}
