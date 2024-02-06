import { create } from "zustand";
import { UserType } from "@/types/userTypes";

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

const useUserStore = create((set) => ({
  userProfileImg: "",
  userBackImg: "",
  userAlias: "",
  bankruptcy: false,
  riotId: "",
}));
