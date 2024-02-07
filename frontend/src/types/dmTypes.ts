export interface DmType {
  dmId: number;
  friendId: number;
  friendEmail: string;
  friendProfilePic: string;
  friendName: string;
  friendAlias: string;
  friendStatus: string;
  lastMessage: string;
  unreadMessage: number;
  modifiedAt: Date;
}
