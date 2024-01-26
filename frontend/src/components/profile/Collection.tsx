import CommentModal from "@/components/profile/CommentModal";
import ThumbsDown from "@/components/profile/ThumbsDown";

export default function Collection() {
  const title = "삽질하는 이수민머리ㅋㅋ";
  // 등록일 데이터
  const update = "2024.01.25 오후 4:27";

  return (
    <div className="lg:hover:scale-105 transition-transform ease-in-out duration-500">
      <div className="h-[200px] w-[320px] border-4 border-inherit mt-5 rounded-3xl bg-[url('/image/liveImage.png')] bg-cover rounded-b-none border-b-0" />
      <div className="w-[320px] border-4 border-inherit rounded-3xl bg-cover rounded-t-none border-t-0 mt-0 mb-5">
        {/* 제목 */}
        <div className="w-full font-bold text-2xl px-2 py-3">{title}</div>
        <div className="flex gap-3 pb-3">
          {/* 싫어요 */}
          <ThumbsDown />
          {/* 댓글 */}
          <CommentModal />
          {/* 등록일 */}
          <div className="grid grid-col place-items-center font-bold">
            {update}
          </div>
        </div>
      </div>
    </div>
  );
}
