import { Link, Outlet, useParams } from "react-router-dom";

import Poor from "@/components/profile/Poor";
import ProfileEdit from "@/components/profile/ProfileEdit";
import ProfileImage from "@/components/profile/ProfileImage";
import UserCurrentAlias from "@/components/navbar/friendsSidebar/UserCurrentAlias";
import Check from "@/components/profile/Check";

export default function ProfilePage() {
  // 사용자 아이디 더미 데이터
  const userId = "1";

  // 사용자 이름
  const userName = "이수민";

  // 사용자 프사
  const userImg = "/image/joinSample.png";

  // 사용자 프로필 배경
  // const profileBg = "/image/profileBg.png";

  // 파산 플래그
  const poorFlag = true;

  // 칭호 내용
  const alias = "생태계파괴자";

  // 체크 버튼 플래그
  const check = false;

  const params = useParams();

  return (
    <div className="border-4 w-full border-red-200 flex flex-col items-center">
      {/* 프로필 배경 */}
      {/* 동적으로 주면 자꾸 됐다가 안됐다가 해서 일단 직접 입력으로 넣음 */}
      <div
        className={`border-4 w-[1000px] h-[350px] flex-col m-1 border-blue-200 bg-[url("/image/profileBg.png")] bg-cover`}
      >
        <div className="flex justify-between border-2 m-1">
          <div className="border-2 m-1 w-[550px] h-[220px]">
            <div className="border-2 m-1 w-[200px] h-[200px] grid place-items-center">
              {/* 프사 */}
              <ProfileImage userImg={userImg} />
            </div>
          </div>
          <div className="border-2 m-1 w-[550px] h-[200px] flex justify-end">
            {/* 파산 이미지 */}
            {/* 파산일때만 보이게 */}
            {poorFlag ? <Poor /> : null}

            {/* 프로필 편집 or 메세지 버튼 */}
            {/* 자신의 프로필이면 프로필 편집 버튼이 나타나게 */}
            {/* 친구의 프로필이면 메세지 버튼이 나타나게 */}
            {params.id === userId ? <ProfileEdit /> : null}
          </div>
        </div>
        <div className="border-2 m-1 w-100% h-[100px] flex gap-[100px] items-center pl-[63px]">
          <div className="font-bold text-4xl">{userName}</div>
          <div>
            <UserCurrentAlias alias={alias} />
          </div>
          <div>
            {/* 뭔지 정확하게 몰라서 일단 체크 버튼 만들었음 */}
            <Check check={check} />
          </div>
        </div>
      </div>
      <div className="border-2 m-1 w-100% h-[50px] w-[1000px] flex gap-10">
        <Link to={`/profile/${params.id}`}>도감</Link>
        <Link to={`/profile/${params.id}/dishonor`}>불명예 전당</Link>
        <Link to={`/profile/${params.id}/record`}>전적</Link>
      </div>

      <Outlet />
    </div>
  );
}
