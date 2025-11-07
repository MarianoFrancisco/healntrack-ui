import type {
  CreateBatchRequestDTO,
  BatchResponseDTO,
  FindBatchesRequestDTO,
} from "~/types/batch";
import { apiClient, ApiError } from "~/lib/api-client";

class BatchService {
  private basePath = "/api/v1/inventory/batches";

  private async handleError(error: any): Promise<never> {
    console.error("API Error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new Error(error.message || "Error desconocido al procesar la solicitud");
  }

  // --- Crear un nuevo lote ---
  async createBatch(request: CreateBatchRequestDTO): Promise<void> {
    try {
      await apiClient.post<void>(this.basePath, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // --- Obtener todos los lotes ---
  async getAllBatches(params?: FindBatchesRequestDTO): Promise<BatchResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.medicineCode) queryParams.append("medicineCode", params.medicineCode);
      if (params?.onlyWithStock !== undefined)
        queryParams.append("onlyWithStock", String(params.onlyWithStock));
      if (params?.onlyNotExpired !== undefined)
        queryParams.append("onlyNotExpired", String(params.onlyNotExpired));

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      return await apiClient.get<BatchResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const batchService = new BatchService();
