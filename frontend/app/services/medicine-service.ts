import type {
  CreateMedicineRequest,
  UpdateMedicineRequest,
  MedicineResponseDTO,
  FindMedicinesRequest,
} from "~/types/medicine";
import { apiClient, ApiError } from "~/lib/api-client";

class MedicineService {
  private basePath = "/api/v1/catalog/medicines";

  private async handleError(error: any): Promise<never> {
    console.error("API Error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new Error(error.message || "Error desconocido al procesar la solicitud");
  }

  // --- Crear nuevo medicamento ---
  async createMedicine(request: CreateMedicineRequest): Promise<MedicineResponseDTO> {
    try {
      return await apiClient.post<MedicineResponseDTO>(this.basePath, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // --- Actualizar medicamento existente ---
  async updateMedicine(code: string, request: UpdateMedicineRequest): Promise<MedicineResponseDTO> {
    try {
      return await apiClient.patch<MedicineResponseDTO>(`${this.basePath}/${code}`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // --- Activar medicamento ---
  async activateMedicine(code: string): Promise<void> {
    try {
      await apiClient.post(`${this.basePath}/${code}:activate`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // --- Desactivar medicamento ---
  async deactivateMedicine(code: string): Promise<void> {
    try {
      await apiClient.post(`${this.basePath}/${code}:deactivate`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // --- Obtener medicamento por código ---
  async getMedicineByCode(code: string): Promise<MedicineResponseDTO> {
    try {
      return await apiClient.get<MedicineResponseDTO>(`${this.basePath}/${code}`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // --- Listar todos los medicamentos ---
  async getAllMedicines(params?: FindMedicinesRequest): Promise<MedicineResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);
      if (params?.isActive !== undefined) queryParams.append("isActive", String(params.isActive));

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      return await apiClient.get<MedicineResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const medicineService = new MedicineService();
