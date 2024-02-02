import ThumbsDown from "@/components/profile/ThumbsDown";
import CommentModal from "@/components/profile/CommentModal";

interface dogam {
  dogamImg: string;
  dogamTitle: string;
  createdAt: string;
  dogamHateAmount: number;
  isHated: boolean;
}

export default function Collection({ dogam }: { dogam: dogam }) {
  return (
    <div className="">
      <div className="h-[200px] w-[320px] border-4 border-inherit mt-5 rounded-3xl bg-[url('/image/liveImage.png')] bg-cover rounded-b-none border-b-0" />
      <div className="w-[320px] border-4 border-inherit rounded-3xl bg-cover rounded-t-none border-t-0 mt-0 mb-5">
        {/* 제목 */}
        <div className="w-full font-bold text-2xl px-2 py-3">
          {dogam.dogamTitle}
        </div>
        <div className="flex gap-3 pb-3 font-bold items-center">
          {/* 싫어요 */}
          <div className="lg:hover:scale-110 transition-transform ease-in-out duration-500">
            <ThumbsDown tD={dogam.isHated} />
          </div>
          <div className=" flex self-center mr-4 text-xl text-blue-600">
            {dogam.dogamHateAmount}
          </div>
          {/* 댓글 */}
          <div className="lg:hover:scale-110 transition-transform ease-in-out duration-500">
            <CommentModal />
          </div>
          {/* 등록일 */}
          <div className="grid grid-col place-items-center font-bold">
            <div className="text-center">{dogam.createdAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
