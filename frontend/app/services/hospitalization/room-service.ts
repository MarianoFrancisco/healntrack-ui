import type {
  CreateRoomRequestDTO,
  RoomResponseDTO,
  SearchRoomsRequestDTO,
  UpdateRoomRequestDTO,
} from "~/types/hospitalization/room";
import { apiClient, ApiError } from "~/lib/api-client";

class RoomService {
  private basePath = "/api/v1/rooms";

  private async handleError(error: any): Promise<never> {
    console.error("API Error:", error);

    if (error instanceof ApiError) {
      throw error; // Propaga el error con detalles del backend
    }

    throw new Error(error.message || "Error desconocido al procesar la solicitud");
  }

  async createRoom(request: CreateRoomRequestDTO): Promise<RoomResponseDTO> {
    try {
      return await apiClient.post<RoomResponseDTO>(this.basePath, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateRoom(id: string, request: UpdateRoomRequestDTO): Promise<RoomResponseDTO> {
    try {
      return await apiClient.patch<RoomResponseDTO>(`${this.basePath}/${id}`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllRooms(params?: SearchRoomsRequestDTO): Promise<RoomResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.number) queryParams.append("number", params.number);
      if (params?.status) queryParams.append("status", params.status);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      return await apiClient.get<RoomResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  async getRoomById(id: string): Promise<RoomResponseDTO> {
    try {
      return await apiClient.get<RoomResponseDTO>(`${this.basePath}/${id}`);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const roomService = new RoomService();
