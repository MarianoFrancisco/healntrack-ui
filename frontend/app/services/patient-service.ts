import type {
  CreatePatientRequestDTO,
  PatientResponseDTO,
  SearchPatientsRequestDTO,
  UpdatePatientRequestDTO,
} from "~/types/patient";
import { apiClient, ApiError } from "~/lib/api-client";

class PatientService {
  private basePath = "/api/v1/patients";

  private async handleError(error: any): Promise<never> {
    console.error("API Error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new Error(error.message || "Error desconocido al procesar la solicitud");
  }

  async createPatient(request: CreatePatientRequestDTO): Promise<PatientResponseDTO> {
    try {
      return await apiClient.post<PatientResponseDTO>(this.basePath, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updatePatient(id: string, request: UpdatePatientRequestDTO): Promise<PatientResponseDTO> {
    try {
      return await apiClient.patch<PatientResponseDTO>(`${this.basePath}/${id}`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPatient(id: string): Promise<PatientResponseDTO> {
    try {
      return await apiClient.get<PatientResponseDTO>(`${this.basePath}/${id}`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllPatients(params?: SearchPatientsRequestDTO): Promise<PatientResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.q) queryParams.append("q", params.q);
      if (params?.gender) queryParams.append("gender", params.gender);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      return apiClient.get<PatientResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const patientService = new PatientService();
