import * as z from "zod";
import Comment from "./Comment";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@/components/navbar/ThemeProvider";
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
  FormMessage,
} from "@/components/ui/form";

import { Mobile, PC } from "../MediaQuery";
import axios from "axios";
import { DogamCommentResponseType } from "@/types/dogamTypes";
import { UserType } from "@/types/userTypes";

const FormSchema = z.object({
  content: z.string().min(2, {
    message: "두글자 이상 입력해주세요!",
  }),
});

export default function CommentModal({ dogamId }: { dogamId: number }) {
  const { theme } = useTheme();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });
  const [dogamComments, setDogamComments] = useState<
    DogamCommentResponseType[]
  >([]);

  // 이거 뭔지 잘 모르겠어서 일단 주석
  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  // }

  const token = localStorage.getItem("token");
  const [myData, setMyData] = useState<UserType | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/data`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setMyData(res.data.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/dogam/${dogamId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("도감댓글", res.data.data.dogamCommentResponseDtos);
        setDogamComments(res.data.data.dogamCommentResponseDtos);
      });
  }, []);

  const [inputText, setInputText] = useState<string>("");

  const addDogamCommentHandler = () => {
    axios
      .post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/friends/dogam/comment/${dogamId}`,
        {
          comment: inputText,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("댓글등록", res.data);
      });
  };

  return (
    <>
      <PC>
        <Popover>
          <PopoverTrigger asChild>
            {theme === "light" ? (
              <div className="bg-[url('/image/comment.png')] h-10 w-10 bg-cover" />
            ) : (
              <div className="bg-[url('/image/comment_dark.png')] h-10 w-10 bg-cover" />
            )}
          </PopoverTrigger>
          <PopoverContent className="w-[700px]">
            <div className="grid gap-4 w-full">
              {/* 헤더 */}
              <div className="space-y-2">
                <h4 className="font-bold leading-none text-xl">댓글 목록</h4>
              </div>
              <div className="grid gap-2">
                <div className="border-2 border-black w-full" />
                {dogamComments &&
                  dogamComments.map((dogamcomment, idx) => (
                    <Comment key={idx} dogamcomment={dogamcomment} />
                  ))}

                {/* 댓글 입력 부분 */}
                <div className="">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(addDogamCommentHandler)}
                      className="flex items-center"
                    >
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex gap-3">
                              <FormControl>
                                <Input
                                  placeholder="댓글 입력"
                                  {...field}
                                  className="w-[590px]"
                                  value={field.value || inputText}
                                  onChange={(e) => {
                                    setInputText(e.target.value);
                                  }}
                                />
                              </FormControl>
                              <Button
                                type="submit"
                                variant="secondary"
                                className="border-solid border-2 border-inherit bg-white font-bold h-[42px] text-lg"
                                onClick={() => {
                                  // 2글자 이상만 작성 가능하게
                                  if (
                                    form.getValues().content != undefined &&
                                    form.getValues().content.length > 1
                                  ) {
                                    addDogamCommentHandler();
                                    // 댓글 입력창 초기화
                                    form.setValue("content", "  ");
                                  }
                                }}
                              >
                                등록
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </PC>

      {/* ----------------------------------------------------------------------- */}
      <Mobile>
        <Popover>
          <PopoverTrigger asChild>
            <div className="bg-[url('/image/comment.png')] h-10 w-10 bg-cover" />
          </PopoverTrigger>
          <PopoverContent className="w-[500px]">
            <div className="grid gap-4 w-full">
              {/* 헤더 */}
              <div className="space-y-2">
                <h4 className="font-bold leading-none text-xl">댓글 목록</h4>
              </div>
              <div className="grid gap-2">
                <div className="border-2 border-black w-full" />
                {dogamComments &&
                  dogamComments.map((dogamcomment, idx) => (
                    <Comment key={idx} dogamcomment={dogamcomment} />
                  ))}

                {/* 댓글 입력 부분 */}
                <div className="">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(addDogamCommentHandler)}
                      className="flex items-center"
                    >
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex gap-3">
                              <FormControl>
                                <Input
                                  placeholder="댓글 입력"
                                  {...field}
                                  className="w-[390px]"
                                  // value={field.value || inputText}
                                  // onChange={(e) => {
                                  //   setInputText(e.target.value);
                                  // }}
                                />
                              </FormControl>
                              <Button
                                type="submit"
                                variant="secondary"
                                className="border-solid border-2 border-inherit bg-white font-bold h-[42px] text-lg"
                                onClick={() => {
                                  // 2글자 이상만 작성 가능하게
                                  if (
                                    form.getValues().content != undefined &&
                                    form.getValues().content.length > 1
                                  ) {
                                    addDogamCommentHandler();
                                    // 댓글 입력창 초기화
                                    form.setValue("content", "  ");
                                  }
                                }}
                              >
                                등록
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Mobile>
    </>
  );
}

//----------------------------------------- 임시 데이터

// 사용자 이름
// const userName = "전수민";
// const userId = "1";
// const userUpdate = "2024.01.26 오후 3:50";
// const userAlias = "10년째 실버";

// // 임시 댓글 리스트
// const commentData = [
//   {
//     userId: "2",
//     name: "이해건",
//     text: "개못하네",
//     update: "2024.01.26 오후 2:06",
//     alias: "인의동손잭스",
//   },
// ];

//-----------------------------------------
