export interface CrowdType {
  [x: string]: any;
  email: string;
  name: string;
  profilePic: string;
}

export interface BroadcastItemType {
  playerId: number;
  playerEmail: string;
  playerName: string;
  playerKakaoImg: string;
  playerBackgroundPic: string;
  roomId: number;
  roomTitle: string;
  crowdDtoList: CrowdType[];
}

export interface BroadcastListResponse {
  broadcasts: BroadcastItemType[];
}
