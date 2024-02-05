// 도감에 달린 댓글
export interface DogamCommentResponseType {
  commentUserImgUrl: string;
  commentUserName: string;
  commetUserEmail: string;
  commentUserId: number;
  comment: string;
  commentId: number;
}

// 도감 상세 (누르면 모달)
export interface DogamDetailType {
  dogamTitle: string;
  dogamId: number;
  friendId: number;
  friendName: string;
  friendEmail: string;
  friendAlias: string | null;
  dogamImgUrl: string;
  friendImgUrl: string;
  dogamDislikeNum: number;
  dogamCommentResponseDto: DogamCommentResponseType;
  hated: boolean;
}

// 메인페이지 새로 올라온 도감
export type NewDogamType = Omit<DogamDetailType, "dogamCommentResponseDto"> & {
  dogamRecentComment: string | null;
};

// 프로필에 있는 도감
export type ProfileDogamType = Omit<
  NewDogamType,
  "friendName" | "friendAlias" | "friendImgUrl" | "dogamRecentComment"
>;
