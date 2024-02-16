export interface CrowdType {
  [x: string]: any;
  attenderEmail: string;
  attenderName: string;
  attenderProfileImg: string;
}

export interface BroadcastItemType {
  // [x: string]: string;
  playerId: number;
  playerEmail: string;
  playerName: string;
  playerProfilePic: string;
  playerBackgroundPic: string;
  roomId: number;
  roomTitle: string;
  crowdDtoList: CrowdType[];
}

export interface BroadcastListResponse {
  broadcasts: BroadcastItemType[];
}
