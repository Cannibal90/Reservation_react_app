export interface ComputerStationRequest {
  monitors: number;
  headphones: boolean;
  microphone: boolean;
  operatingSystem: string;
  graphicCard: string;
  cpu: string;
  ram: number;
  drive: number;
  networkType: string;
  deskId: number;
}

export interface ComputerStationResponse {
  id: number;
  monitors: number;
  headphones: boolean;
  microphone: boolean;
  operatingSystem: string;
  graphicCard: string;
  cpu: string;
  ram: number;
  drive: number;
  networkType: string;
}
