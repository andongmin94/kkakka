import { create } from "zustand";
import { UserType } from "@/types/userTypes";

interface UserStoreType {
  userInfo: UserType;
  setUserInfo: (newUserInfo: UserType) => void;
}

const useUserStore = create<UserStoreType>((set) => ({
  userInfo: {
    userName: "",
    userEmail: "",
    userProfileImg: "",
    userBackImg: "",
    userAlias: "",
    userId: 0,
    bankruptcy: false,
    riotId: "",
  },
  setUserInfo: (newUserInfo) => set({ userInfo: newUserInfo }),
}));

export default useUserStore;
