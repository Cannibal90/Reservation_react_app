export interface DeskRequest {
  deskType: string;
  roomId: number;
}

export interface DeskResponse {
  id: number;
  deskType: string;
  stationsCount: number;
}
