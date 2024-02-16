// 로그인했을 때 받아오는 정보
export interface UserType {
  userName: string;
  userEmail: string;
  userProfileImg: string;
  userBackImg: string;
  userAlias: string | null;
  userId: number;
  bankruptcy: boolean;
  riotId: string | null;
}
