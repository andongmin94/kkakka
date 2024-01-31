import CommentModal from "../profile/CommentModal";
import ThumbsDown from "../profile/ThumbsDown";

export default function NewDogam() {
  const dogamImg = "/image/liveImage.png";
  const dogamTitle = "냠냠";
  const createdAt = "2020-01-01 00:00:00";
  const dogamHateAmount = 100;
  const isHated = false;
  return (
    <div className="flex mt-5">
      <div className="h-[200px] w-[320px] border-4 border-inherit rounded-3xl rounded-r-none"></div>
      <div>
        {/* 이미지 일단은 정적으로 들어감 */}
        <div className="h-[200px] w-[320px] border-4 border-inherit rounded-3xl rounded-l-none border-l-0 bg-[url('/image/liveImage.png')] bg-cover rounded-b-none border-b-0" />
        <div className="w-[320px] border-4 border-inherit rounded-3xl bg-cover rounded-t-none border-t-0 mt-0 mb-5">
          {/* 제목 */}
          <div className="w-full font-bold text-2xl px-2 py-3">
            {dogamTitle}
          </div>
          <div className="flex gap-3 pb-3 font-bold items-center">
            {/* 싫어요 */}
            <div className="lg:hover:scale-110 transition-transform ease-in-out duration-500">
              <ThumbsDown tD={isHated} />
            </div>
            <div className=" flex self-center mr-4 text-xl text-blue-600">
              {dogamHateAmount}
            </div>
            {/* 댓글 */}
            <div className="lg:hover:scale-110 transition-transform ease-in-out duration-500">
              <CommentModal />
            </div>
            {/* 등록일 */}
            <div className="grid grid-col place-items-center font-bold">
              <div className="text-center">{createdAt}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
