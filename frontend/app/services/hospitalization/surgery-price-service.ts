
import { apiClient, ApiError } from "~/lib/api-client";
import type { CreateSurgeryPriceRequestDTO, SearchSurgeryPricesRequestDTO, SurgeryPriceResponseDTO, UpdateSurgeryPriceRequestDTO } from "~/types/hospitalization/surgery";

class SurgeryPriceService {
  private basePath = "/api/v1/surgery-prices";

  private async handleError(error: any): Promise<never> {
    console.error("API Error:", error);

    if (error instanceof ApiError) {
      throw error; // Mantiene el error con detalles del backend
    }

    throw new Error(error.message || "Error desconocido al procesar la solicitud");
  }

  async getAll(params?: SearchSurgeryPricesRequestDTO): Promise<SurgeryPriceResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.name) queryParams.append("name", params.name);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      return apiClient.get<SurgeryPriceResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async create(request: CreateSurgeryPriceRequestDTO): Promise<SurgeryPriceResponseDTO> {
    try {
      return await apiClient.post<SurgeryPriceResponseDTO>(this.basePath, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(id: string, request: UpdateSurgeryPriceRequestDTO): Promise<void> {
    try {
      await apiClient.patch(`${this.basePath}/${id}`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const surgeryPriceService = new SurgeryPriceService();
