// @/types/dogamTypes

// 도감에 달린 댓글
export interface DogamCommentResponseType {
  commentUserImgUrl: string;
  commentUserName: string;
  commetUserEmail: string;
  commentUserId: number;
  comment: string;
  commentId: number;
  createdAt: string;
}

// 도감 상세 (누르면 모달)
export interface DogamDetailType {
  dogamId: number;
  dogamTitle: string;
  dogamCreatedAt: string;
  dogamUserId: number;
  dogamUserName: string;
  dogamUserEmail: string;
  curAlias: string | null; // 도감주인 칭호
  dogamImgUrl: string; // 도감사진
  userImgUrl: string; // 도감주인 프사
  dogamHatedNum: number;
  dogamCommentResponseDtos: DogamCommentResponseType;
  dogamCommentNum: number;
  hated: boolean; // 내가 도감 시러요 했는지
}

// 메인페이지 새로 올라온 도감
export type NewDogamType = {
  hated: boolean;
  dogamId: number;
  dogamTitle: string;
  friendAlias: string;
  dogamImgUrl: string;
  friendImgUrl: string;
  friendName: string;
  dogamDislikeNum: number;
  dogamCommentResponseDtos: DogamCommentResponseType[];
  friendId: number;
  friendEmail: string;
};

// 프로필에 있는 도감
export type ProfileDogamType = Omit<
  NewDogamType,
  "dogamUserName" | "curAlias" | "userImgUrl" | "dogamRecentComment"
>;

// 프로필에 있는 도감 (싫어요 수 포함)
export interface ProfileDogamWithDislikeNumType extends ProfileDogamType {
  dogamDislikeNum: number;
  createdAt: string;
  setDogamDislikeNum: React.Dispatch<React.SetStateAction<number>>;
}
