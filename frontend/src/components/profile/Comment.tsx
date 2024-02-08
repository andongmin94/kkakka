import { Button } from "../ui/button";
// import CommentAlias from "./CommentAlias";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "@/types/userTypes";
import { DogamCommentResponseType } from "@/types/dogamTypes";

export default function Comment({
  dogamcomment,
}: {
  dogamcomment: DogamCommentResponseType;
}) {
  const [myData, setMyData] = useState<UserType | null>(null);
  const token = localStorage.getItem("token");
  const loginUserId = myData?.userId;

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

  const deleteCommentHandler = (commentId: number) => {
    axios
      .delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/friends/dogam/comment/${commentId}`,
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
    <div className="my-2">
      <div className="flex justify-between">
        <div className="flex">
          <p className="mx-1 font-bold text-lg">
            {dogamcomment.commentUserName}
          </p>
          <div className="flex items-center ml-2">
            {/* <CommentAlias alias={data.commentAlias} /> 댓글에는 따로 alias 안보내줌 */}
          </div>
          {/* 자기일때만 삭제버튼 보이게 */}
          {dogamcomment.commentUserId === loginUserId ? (
            <div className="flex ml-2">
              <Button
                variant="destructive"
                className="w-5 h-5 self-center"
                onClick={() => {
                  deleteCommentHandler(dogamcomment.commentId);
                }}
              >
                삭제
              </Button>
            </div>
          ) : null}
        </div>
        {/* <p className="mx-1">{data.update}</p> 이게 뭐지 */}
      </div>
      <p className="border-2 w-full rounded-md px-1">{dogamcomment.comment}</p>
    </div>
  );
}
