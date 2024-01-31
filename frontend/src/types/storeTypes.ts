// main
export interface mainStoreType {
  myPoint: number;
  myProfilePic: string;
  liveBroadcastList: [];
  newDogamList: [];
  fetchMyPoint: () => void;
  fetchMyProfilePic: () => void;
  fetchLiveBroadcastList: () => void;
  fetchNewDogamList: () => void;
}

export interface friendStoreType {
  friends: [];
  fetchFriends: () => void;
}

export interface alarmStoreType {
  alarms: [] | null;
  fetchAlarms: () => void;
  checkAlarm: (alarmId: number) => void;
}

// broadcast
export interface broadcastStoreType {
  broadcasts: [];
  createBetStatus: string;
  errorMessage: string | null;
  startBroadcast: (friendEmail: string) => void;
  createBet: (
    roomId: number,
    previousBetAmount: number,
    betAmount: number,
    winOrLose: boolean
  ) => void;
}

// profile
import { ProfileDogamType } from "@/types/dogamTypes";
export interface profileDogamStoreType {
  profileDogams: ProfileDogamType[];
  dogamDetail: {};
  addDogamStatus: string;
  deleteDogamStatus: string;
  errorMessage: string | null;
  fetchProfileDogams: (friendEmail: string) => void;
  fetchDogamDetail: (dogamId: number) => void;
  addDogam: (
    formData: FormData,
    access_token: string,
    friendEmail: string
  ) => void;
  deleteDogam: (dogamId: number) => void;
}

import { AliasType } from "@/types/aliasTypes";

export interface aliasStoreType {
  aliases: AliasType[];
  addAliasStatus: string;
  errorMessage: string | null;
  fetchAliases: (friendEmail: string) => void;
  addAlias: (
    formData: FormData,
    access_token: string,
    friendEmail: string
  ) => void;
}

// dm
import { DmType } from "@/types/dmTypes";

export interface dmStoreType {
  dmList: DmType[];
  fetchDmList: () => void;
  startDm: (friendEmail: string) => void;
  enterDm: (friendEmail: string) => void;
  deleteDm: (friendEmail: string) => void;
  outingDm: (dmId: number) => void;
}

// itemshop
import { ItemType } from "@/types/itemTypes";

export interface itemshopStoreType {
  items: ItemType[];
  fetchItems: () => void;
}

// auth
export interface AuthStoreType {
  token: string | null;
  setToken: (code: string) => void;
  logout: () => void;
}
