export interface DurrationResponse {
  id: number;
  beginning: Date;
  end: Date;
}

export interface ReservationRequest {
  userId: number;
  stationId: number;
  beginning: Date;
  end: Date;
}

export interface ReservationResponse {
  id: number;
  durration: DurrationResponse;
  stationId: number;
}

export interface SchedulerData {
  id: number;
  startDate: Date;
  endDate: Date;
  stationId: number;
}
