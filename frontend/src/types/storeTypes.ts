// alarm
export interface alarmStoreType {
  alarms: [] | null;
  fetchAlarms: () => void;
  subscribeAlarm: () => void;
  checkAlarm: (alarmId: number) => void;
  checkNewAlarms: (lastEventId: string) => void;
}

// auth
export interface AuthStoreType {
  token: string | null;
  setToken: (code: string) => void;
  logout: () => void;
}

// broadcast
export interface broadcastStoreType {
  createBetStatus: string;
  errorMessage: string | null;
  liveBroadcastList: [];
  fetchLiveBroadcastList: () => void;
  startBroadcast: (friendEmail: string) => void;
  createBet: (roomId: number, curBettingPoint: number, isWin: boolean) => void;
  settleBet: (roomId: number) => void;
}

// dm
import { DmType } from "@/types/dmTypes";

export interface dmStoreType {
  dmList: DmType[];
  prevChat: [];
  fetchDmList: () => void;
  enterDm: (friendEmail: string) => void;
  deleteDm: (friendEmail: string) => void;
  loadPrevChat: (dmId: number) => void;
}

// feed
export interface FeedStoreType {
  newDogamList: [];
  fetchNewDogamList: () => void;
  disLikeDogam: (dogamId: number) => void;
  unDislikeDogam: (dogamId: number) => void;
}

// friend
export interface friendStoreType {
  friends: [];
  fetchFriends: () => void;
  checkIsFriend: (userEmail: string) => void;
  sendFriendRequest: (userEmail: string) => void;
}

// itemshop
import { ItemType } from "@/types/itemTypes";

export interface itemshopStoreType {
  items: ItemType[];
  addAliasStatus: string;
  deleteDogamStatus: string;
  errorMessage: string | null;
  fetchItems: () => void;
  deleteDogam: (dogamId: number) => void;
  addAlias: (formData: FormData, friendEmail: string) => void;
  buyForcePraise: (friendEmail: string) => void;
  buyMegaphone: () => void;
}

// main
export interface mainStoreType {
  myPoint: number;
  myEmail: string;
  myProfilePic: string;
  fetchMyPoint: () => void;
  fetchMyProfilePic: () => void;
}

// profile
// 프로필도감, 도감디테일
import { ProfileDogamType } from "@/types/dogamTypes";
export interface profileDogamStoreType {
  profileDogams: ProfileDogamType[];
  dogamDetail: {};
  addDogamStatus: string;
  deleteDogamStatus: string;
  errorMessage: string | null;
  fetchProfileDogams: (friendEmail: string) => void;
  fetchDogamDetail: (dogamId: number) => void;
  addDogam: (formData: FormData, friendEmail: string) => void;
  createComment: (dogamId: number, comment: string) => void;
  deleteComment: (commentId: number) => void;
}

// 프로필 칭호
import { AliasType } from "@/types/aliasTypes";

export interface aliasStoreType {
  aliases: AliasType[];
  addAliasStatus: string;
  errorMessage: string | null;
  fetchAliases: (userEmail: string) => void;
}
