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

export default function AddCollection({ userId }: { userId: number }) {
  const [dogamImage, setDogamImage] = useState<File | null>(null);
  const [dogamTitle, setDogamTitle] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [addedDogams, setAddedDogams] = useState<string[]>([]);

  console.log(addedDogams);

  useEffect(() => {
    if (successMessage) {
      setAddedDogams((prevDogams) => [...prevDogams, dogamTitle]);
      // 추가된 컬렉션을 바로 렌더링할 수 있도록 페이지를 새로고침합니다.
      window.location.reload();
    }
  }, [successMessage, dogamTitle]);

  const token = localStorage.getItem("token") || "";

  const addDogamHandler = () => {
    const formData = new FormData();
    formData.append("imgUrl", dogamImage as File);
    formData.append("dogamTitle", dogamTitle);

    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/dogam`,
        formData,
        {
          params: { "friends-user-id": userId },
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("도감이 성공적으로 추가되었습니다.");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const imgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDogamImage(file);
    }
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
                    src={URL.createObjectURL(dogamImage)}
                    className="rounded-lg bg-cover h-[200px] w-[320px] border-2"
                    alt="도감 이미지"
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
                <Input
                  id="text"
                  placeholder="제목을 입력해주세요"
                  value={dogamTitle}
                  onChange={(e) => setDogamTitle(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="font-bold">프로필 사진</Label>
                <Input id="picture" type="file" onChange={imgUpload} />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px]"
                  onClick={addDogamHandler}
                >
                  저장하기
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </PC>

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
                    src={URL.createObjectURL(dogamImage)}
                    className="rounded-lg bg-cover h-[200px] w-[320px] border-2"
                    alt="도감 이미지"
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
                <Input
                  id="text"
                  placeholder="제목을 입력해주세요"
                  value={dogamTitle}
                  onChange={(e) => setDogamTitle(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="font-bold">프로필 사진</Label>
                <Input id="picture" type="file" onChange={imgUpload} />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px]"
                  onClick={addDogamHandler}
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
