import { create } from "zustand";
import { UserType } from "@/types/userTypes";

interface ProfileStoreType {
  profileInfo: UserType;
  setProfileInfo: (newProfileInfo: UserType) => void;
}

const useProfileStore = create<ProfileStoreType>((set) => ({
  profileInfo: {
    userName: "",
    userEmail: "",
    userProfileImg: "",
    userBackImg: "",
    userAlias: "",
    userId: 0,
    bankruptcy: false,
    riotId: "",
  },
  setProfileInfo: (newProfileInfo) => set({ profileInfo: newProfileInfo }),
}));

export default useProfileStore;
