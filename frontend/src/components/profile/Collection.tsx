// Collection.tsx

import { ProfileDogamWithDislikeNumType } from "@/types/dogamTypes";
import { Link } from "react-router-dom";

export default function Collection({
  profiledogam,
}: {
  profiledogam: ProfileDogamWithDislikeNumType;
}) {
  return (
    <div className="flex flex-col justify-center items-center shadow-lg   bg-gray-400 rounded-md mr-8 mb-8 relative overflow-hidden mt-3 ">
      <Link to={`/main/dogam/${profiledogam.dogamId}`}>
        <img src={profiledogam.dogamImgUrl} />
        {/* 오버레이 */}
        <div className="absolute bg-black top-0 left-0 bg-opacity-50 opacity-0 hover:opacity-100 rounded-md w-[100%] h-[100%] flex justify-center items-center">
          {/* 타이틀 */}
          <div className=" text-lg text-center mb-3 w-[50%] text-white drop-shadow-md ">
            {profiledogam.dogamTitle.length > 30
              ? `${profiledogam.dogamTitle.substring(0, 30)}...`
              : profiledogam.dogamTitle}
          </div>
        </div>
      </Link>
    </div>
  );
}
