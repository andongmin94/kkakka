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
  alarms: [];
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
export interface profileDogamStoreType {
  profileDogams: [];
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

export interface aliasStoreType {
  aliases: [];
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
export interface dmStoreType {
  dmList: [];
  fetchDmList: () => void;
  startDm: (friendEmail: string) => void;
  enterDm: (friendEmail: string) => void;
  deleteDm: (friendEmail: string) => void;
  outingDm: (dmId: number) => void;
}
