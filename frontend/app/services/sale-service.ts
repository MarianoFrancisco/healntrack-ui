import type { 
  CreateSaleDTO, 
  SaleResponseDTO, 
  SearchSaleRequest 
} from "~/types/sale";
import { apiClient, ApiError } from "~/lib/api-client";

class SaleService {
  private basePath = "/api/v1/sales";

  private async handleError(error: any): Promise<never> {
    console.error("API Error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new Error(error.message || "Error desconocido al procesar la solicitud");
  }

  async createSale(request: CreateSaleDTO): Promise<SaleResponseDTO> {
    try {
      const response = await apiClient.post<SaleResponseDTO>(this.basePath, request);
      console.log("Sale created successfully:", response);
      return response;
    } catch (error) {
      console.log("Error creating sale:", error);
      return this.handleError(error);
    }
  }

  async getSale(id: string): Promise<SaleResponseDTO> {
    try {
      return await apiClient.get<SaleResponseDTO>(`${this.basePath}/${id}`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async listSales(params?: SearchSaleRequest): Promise<SaleResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.occurredFrom) queryParams.append("occurredFrom", params.occurredFrom.toString());
      if (params?.occurredTo) queryParams.append("occurredTo", params.occurredTo.toString());
      if (params?.sellerId) queryParams.append("sellerId", params.sellerId);
      if (params?.status) queryParams.append("status", params.status);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      return apiClient.get<SaleResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const saleService = new SaleService();
