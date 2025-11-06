import type { 
  FindAllVacationsRequestDTO, 
  RequestVacationRequestDTO, 
  ReviewVacationRequestDTO, 
  VacationResponseDTO 
} from "~/types/vacation";
import { apiClient, ApiError } from "~/lib/api-client";

class VacationService {
  private basePath = "/api/v1/employees/vacations";

  private async handleError(error: any): Promise<never> {
    console.error("API Error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new Error(error.message || "Error desconocido al procesar la solicitud");
  }

  async findAllVacations(params?: FindAllVacationsRequestDTO): Promise<VacationResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.employee) queryParams.append("employee", params.employee);
      if (params?.department) queryParams.append("department", params.department);
      if (params?.startDate) queryParams.append("startDate", params.startDate);
      if (params?.endDate) queryParams.append("endDate", params.endDate);
      if (params?.requestedAtFrom) queryParams.append("requestedAtFrom", params.requestedAtFrom);
      if (params?.requestedAtTo) queryParams.append("requestedAtTo", params.requestedAtTo);
      if (params?.status) queryParams.append("status", params.status);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      return await apiClient.get<VacationResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async requestVacation(request: RequestVacationRequestDTO): Promise<VacationResponseDTO> {
    try {
      return await apiClient.post<VacationResponseDTO>(this.basePath, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getVacationById(vacationId: string): Promise<VacationResponseDTO> {
    try {
      return await apiClient.get<VacationResponseDTO>(`${this.basePath}/${vacationId}`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async approveVacation(vacationId: string, request: ReviewVacationRequestDTO): Promise<void> {
    try {
      await apiClient.post<void>(`${this.basePath}/${vacationId}/approve`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async rejectVacation(vacationId: string, request: ReviewVacationRequestDTO): Promise<void> {
    try {
      await apiClient.post<void>(`${this.basePath}/${vacationId}/reject`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const vacationService = new VacationService();