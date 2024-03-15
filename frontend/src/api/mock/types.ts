export type FriendState = "NONE" | "SEND" | "RECEIVE" | "FRIEND";

export interface DemoUser {
  id: number;
  name: string;
  email: string;
  profileImg: string;
  backImg: string;
  alias: string | null;
  riotId: string | null;
  point: number;
  state: "ONLINE" | "OFFLINE" | "GAMING" | "WATCHING";
}

export interface DemoComment {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
}

export interface DemoDogam {
  id: number;
  userId: number;
  title: string;
  imageUrl: string;
  createdAt: string;
  dislikedBy: number[];
  comments: DemoComment[];
}

export interface DemoChatMessage {
  id: number;
  messageType: "ENTER" | "QUIT" | "TALK" | "CHAT_BOT" | "WIN" | "LOSE" | "INGAME";
  content: string | null;
  userId: number;
  userName: string;
  userProfileImg: string;
  userCurAlias: string | null;
  chatRoomId: number;
  createdAt: string;
  updateAt: string;
  imgCode: string | null;
}

export interface DemoRoom {
  id: number;
  type: "ONE" | "MANY";
  ownerId: number;
  memberIds: number[];
  title: string;
  messages: DemoChatMessage[];
  betting: {
    predictWin: number;
    predictLose: number;
    bets: Record<string, { point: number; isWin: boolean }>;
  };
}

export interface DemoNotification {
  id: number;
  content: string;
  imageUrl: string;
  checked: boolean;
  createdAt: string;
  relatedEmail: string | null;
  relatedContentId: number | null;
}

export interface DemoState {
  schemaVersion: 1;
  currentUserId: number;
  users: DemoUser[];
  friendships: Record<string, FriendState>;
  dogams: DemoDogam[];
  rooms: DemoRoom[];
  notifications: DemoNotification[];
  aliases: Record<string, Array<{ alias: string; creator: string; createdAt: string }>>;
  enforcementScripts: Array<{ receiverId: number; content: string; createdAt: string }>;
  megaphones: Array<{ userId: number; content: string; createdAt: string }>;
  lastNotiEventId: string;
  nextIds: {
    dogam: number;
    comment: number;
    message: number;
    room: number;
    notification: number;
  };
}

export type DemoEvent =
  | { type: "alarm"; payload: Record<string, unknown> }
  | { type: "megaphone"; payload: Record<string, unknown> };
