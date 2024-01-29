// 메인페이지 새로 올라온 도감
export interface NewDogamType {
  dogamOwnerName: string;
  dogamOwnerAlias: string;
  dogamOwnerProfilePic: string;
  dogamPic: string;
  dogamTitle: string;
  dogamHateNumber: number;
  isHated: boolean;
  dogamRecentComment: string;
}

// 프로필에 있는 도감
export type ProfileDogamType = Omit<
  NewDogamType,
  | "dogamOwnerName"
  | "dogamOwnerAlias"
  | "dogamOwnerProfilePic"
  | "dogamRecentComment"
>;
