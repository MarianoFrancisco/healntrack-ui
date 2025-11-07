export type RoomStatus = "AVAILABLE" | "OCCUPIED" | "OUT_OF_SERVICE";

export interface CreateRoomRequestDTO {
  number: string;
  costPerDay: number;
  maintenanceCost: number;
  status: RoomStatus;
}

export interface RoomResponseDTO {
  id: string;
  number: string;
  costPerDay: number;
  maintenanceCost: number;
  status: RoomStatus;
}

export interface SearchRoomsRequestDTO {
  number?: string;
  status?: RoomStatus;
}

export interface UpdateRoomRequestDTO {
  number?: string;
  costPerDay?: number;
  maintenanceCost?: number;
  status?: RoomStatus;
}
