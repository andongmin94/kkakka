export interface CrowdType {
  email: string;
  name: string;
  profilePic: string;
}

export interface BroadcastType {
  playerEmail: string;
  playerName: string;
  playerProfilePic: string;
  playerBackgroundPic: string;
  roomId: number;
  roomTitle: string;
  crowdList: CrowdType[];
}
