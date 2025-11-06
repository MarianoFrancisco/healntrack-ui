import type { ConsultationResponseDTO, CreateConsultationRequestDTO, SearchConsultationsRequestDTO } from "~/types/consultation";
import { apiClient, ApiError } from "~/lib/api-client";

class ConsultationService {
  private basePath = "/api/v1/consultations";

  private async handleError(error: any): Promise<never> {
    console.error("API Error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new Error(error.message || "Error desconocido al procesar la solicitud");
  }

  async createConsultation(request: CreateConsultationRequestDTO): Promise<ConsultationResponseDTO> {
    try {
      return await apiClient.post<ConsultationResponseDTO>(this.basePath, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllConsultations(params?: SearchConsultationsRequestDTO): Promise<ConsultationResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.patientId) queryParams.append("patientId", params.patientId);
      if (params?.employeeId) queryParams.append("employeeId", params.employeeId);
      if (params?.dateFrom) queryParams.append("dateFrom", params.dateFrom);
      if (params?.dateTo) queryParams.append("dateTo", params.dateTo);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      return apiClient.get<ConsultationResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const consultationService = new ConsultationService();
