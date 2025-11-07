import { apiClient, ApiError } from "~/lib/api-client";
import type { ProfitResponseDTO, SearchProfitsRequestDTO, SearchTransactionsRequestDTO, TransactionResponseDTO } from "~/types/reports";

class TransactionService {
  private basePath = "/api/v1/transactions";

  private async handleError(error: any): Promise<never> {
    console.error("API Error:", error);

    if (error instanceof ApiError) {
      throw error; // Mantiene el error con detalles del backend
    }

    throw new Error(error.message || "Error desconocido al procesar la solicitud");
  }

  async getAllTransactions(params: SearchTransactionsRequestDTO): Promise<TransactionResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params.area) queryParams.append("area", params.area);
      if (params.startDate) queryParams.append("startDate", params.startDate);
      if (params.endDate) queryParams.append("endDate", params.endDate);
      if (params.type) queryParams.append("type", params.type);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      return apiClient.get<TransactionResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllProfits(params: SearchProfitsRequestDTO): Promise<ProfitResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params.area) queryParams.append("area", params.area);
      if (params.startDate) queryParams.append("startDate", params.startDate);
      if (params.endDate) queryParams.append("endDate", params.endDate);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}/profits?${queryString}` : `${this.basePath}/profits`;

      return apiClient.get<ProfitResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const transactionService = new TransactionService();
