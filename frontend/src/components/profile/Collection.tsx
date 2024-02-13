// Collection.tsx

import ThumbsDown from "@/components/profile/ThumbsDown";
import CommentModal from "@/components/profile/CommentModal";
import { ProfileDogamWithDislikeNumType } from "@/types/dogamTypes";

export default function Collection({
  profiledogam,
}: {
  profiledogam: ProfileDogamWithDislikeNumType;
}) {
  return (
    <div className="flex-initial md:w-auto mb-3 mr-3">
      <div
        className="h-[170px] border-2 border-inherit mt-2 rounded-3xl  rounded-b-none border-b-0"
        style={{
          backgroundImage: `url(${profiledogam.dogamImgUrl})`,
          backgroundSize: "cover",
        }}
      />
      <div className="border-2 border-inherit rounded-3xl bg-cover rounded-t-none border-t-0 mt-0 ">
        {/* 제목 */}
        <div className="w-full font-bold text-xl px-4 py-3">
          {profiledogam.dogamTitle}
        </div>
        <div className="flex pb-3 font-bold items-center w-full">
          {/* 싫어요 */}
          <div className="lg:hover:scale-110 transition-transform ease-in-out duration-500">
            <ThumbsDown
              tD={profiledogam.hated}
              dogamId={profiledogam.dogamId}
              dogamDislikeNum={profiledogam.dogamDislikeNum}
              setDogamDislikeNum={profiledogam.setDogamDislikeNum}
            />
          </div>
          <div className="flex self-center text-sm text-blue-600">
            {profiledogam.dogamDislikeNum}
          </div>
          {/* 댓글 */}
          <div className="lg:hover:scale-110 transition-transform ease-in-out duration-500">
            <CommentModal dogamId={profiledogam.dogamId} />
          </div>
          {/* 등록일 */}
          <div className="font-bold w-1/2">
            <div className="text-end">{profiledogam.createdAt.slice(0, 10)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
