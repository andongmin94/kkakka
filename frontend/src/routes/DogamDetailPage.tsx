import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Comment from "@/components/profile/Comment";
import { DogamDetailType, DogamCommentResponseType } from "@/types/dogamTypes";
import ThumbsDown from "@/components/profile/ThumbsDown";
import UserName from "@/components/navbar/friendsSidebar/UserName";
import UserCurrentAlias from "@/components//UserCurrentAlias";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
const FormSchema = z.object({
  content: z.string().min(2, {
    message: "두글자 이상 입력해주세요!",
  }),
});

export default function DogamDetailPage() {
  const params = useParams();
  const [dogamInfo, setDogamInfo] = useState<DogamDetailType>({
    dogamId: 0,
    dogamTitle: "",
    dogamCreatedAt: "",
    dogamUserId: 0,
    dogamUserName: "",
    dogamUserEmail: "",
    curAlias: "",
    dogamImgUrl: "",
    userImgUrl: "",
    dogamHatedNum: 0,
    dogamCommentResponseDtos: {
      commentUserImgUrl: "",
      commentUserName: "",
      commetUserEmail: "",
      commentUserId: 0,
      comment: "",
      commentId: 0,
      createdAt: "",
    },
    hated: false,
    dogamCommentNum: 0,
  });
  const [commentList, setCommentList] = useState<DogamCommentResponseType[]>(
    []
  );
  const [dogamDislikeNum, setDogamDislikeNum] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/dogam/${params.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setDogamInfo(res.data.data);
        setCommentList(res.data.data.dogamCommentResponseDtos);
        setDogamDislikeNum(res.data.data.dogamHatedNum);
      });
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });

  const addDogamCommentHandler = (values: z.infer<typeof FormSchema>) => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/dogam/comment/${
          params.id
        }`,
        {
          comment: values.content,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("댓글등록", res.data);
        const addedComment = res.data.data;
        setCommentList((commentList) => [...commentList, addedComment]);
      })
      .then(() => {
        window.alert("댓글이 등록되었습니다.");
        form.reset();
      });
  };

  return (
    <>
      <div>
        {/* 전체 */}
        <div className="flex h-[600px] mx-20 my-32">
          {/* 왼쪽 */}
          <div className="w-[50%] flex items-center justify-center h-full bg-black bg-opacity-80 rounded-l-lg overflow-scroll scrollbar-hide">
            <img src={dogamInfo.dogamImgUrl} alt="도감사진" className="" />
          </div>
          {/* 오른쪽 */}
          <div className="flex flex-col w-[50%] border-2 border-l-0 rounded-r-lg">
            {/* 오른쪽 위 */}
            <div className="h-[20%]">
              <Link
                to={`/main/profile/${dogamInfo.dogamUserId}`}
                className="flex items-center bg-slate-200 "
              >
                <img
                  src={dogamInfo.userImgUrl}
                  alt="유저프사"
                  className="w-10 h-10 rounded-full mx-6 my-6"
                />
                <div className="-mt-[10px] mr-4">
                  <UserName name={dogamInfo.dogamUserName} />
                </div>
                <div>
                  <UserCurrentAlias alias={dogamInfo.curAlias} />
                </div>
              </Link>
            </div>
            {/* 오른쪽 중간 */}
            <div className="h-[30%] px-4 border-b-2">
              <div className="font-bold text-lg h-[80%] flex flex-col overflow-hidden">
                {dogamInfo.dogamTitle}
              </div>

              <div className="flex  h-[10%] justify-between">
                <div className="flex items-center">
                  <ThumbsDown
                    tD={dogamInfo.hated}
                    dogamId={Number(params.id)}
                    dogamDislikeNum={dogamDislikeNum}
                    setDogamDislikeNum={setDogamDislikeNum}
                  />
                  <div className="text-xs mr-3">{dogamDislikeNum}</div>
                  <div className="text-xl">💬</div>
                </div>
                {dogamInfo.dogamCreatedAt.substring(0, 10)}
              </div>
            </div>
            {/* 오른쪽 하단 -댓글 */}
            <div className="h-[50%] overflow-scroll scrollbar-hide">
              {commentList.length > 0 ? (
                commentList.map((comment) => {
                  return <Comment key={comment.commentId} commentInfo={comment} />;
                })
              ) : (
                <div className="mt-5 ml-5 text-gray-500">
                  첫번째 댓글을 남겨보세요 🤭
                </div>
              )}
            </div>

            {/* 댓글 입력 부분 */}
            <div className="h-[10%] px-2 shadow-inner flex items-center">
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
                        <div className="flex w-full">
                          <FormControl>
                            <Input
                              placeholder="댓글 입력"
                              {...field}
                              className="h-[80%] w-80 mr-2"
                              // value={field.value || inputText}
                              // onChange={(e) => {
                              //   setInputText(e.target.value);
                              // }}
                            />
                          </FormControl>
                          <Button
                            type="submit"
                            className=" bg-blue-400 font-bold text-sm shadow-md text-white rounded-lg h-[80%] "
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
      </div>
    </>
  );
}
