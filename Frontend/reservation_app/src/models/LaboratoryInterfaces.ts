export interface LaboratoryRequest {
  floor: number;
  roomSupervisor: string;
}

export interface LaboratoryResponse {
  id: number;
  floor: number;
  roomSupervisor: string;
  deskCount: number;
}
