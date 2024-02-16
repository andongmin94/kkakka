import { Button } from "../ui/button";
import axios from "axios";

import { DogamCommentResponseType } from "@/types/dogamTypes";
import { Link } from "react-router-dom";

export default function Comment({
  commentInfo,
}: {
  commentInfo: DogamCommentResponseType;
}) {
  const token = localStorage.getItem("token");
  const loginUserId = Number(localStorage.getItem("userId"));

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
      .then(() => {
        window.alert("댓글이 삭제되었습니다.");
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div className="py-2 px-4 border-b-2 bg-gray-100">
      <div className="flex">
        <Link
          to={`/main/profile/${commentInfo.commentUserId}`}
          className="flex mx-1 my-1 items-center"
        >
          <img
            src={commentInfo.commentUserImgUrl}
            alt="프로필사진"
            className="w-8 h-8 rounded-full mr-1 border-2"
          />
          <div className=" font-bold text-sm ">
            {commentInfo.commentUserName}
          </div>
        </Link>
      </div>
      <div className="flex">
        <p className="w-full rounded-md px-1">{commentInfo.comment}</p>
        {/* 자기일때만 삭제버튼 보이게 */}
        {commentInfo.commentUserId === loginUserId ? (
          <div className="flex ml-2">
            <Button
              variant="destructive"
              className="w-5 h-5 self-center text-xs shadow-sm"
              onClick={() => {
                console.log("삭제");
                console.log(commentInfo.commentId);
                deleteCommentHandler(commentInfo.commentId);
              }}
            >
              삭제
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
