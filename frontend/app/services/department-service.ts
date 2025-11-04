import type { CreateDepartmentRequest, DepartmentResponseDTO, FindDepartmentsRequest, UpdateDepartmentRequest } from "~/types/department";
import { apiClient, ApiError } from "~/lib/api-client";

class DepartmentService {
  private basePath = "/api/v1/departments";

  private async handleError(error: any): Promise<never> {
    console.error("API Error:", error);

    if (error instanceof ApiError) {
      throw error; // Mantiene el error con detalles del backend
    }

    throw new Error(error.message || "Error desconocido al procesar la solicitud");
  }

  async createDepartment(request: CreateDepartmentRequest): Promise<DepartmentResponseDTO> {
    try {
      return await apiClient.post<DepartmentResponseDTO>(this.basePath, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateDepartment(code: string, request: UpdateDepartmentRequest): Promise<DepartmentResponseDTO> {
    try {
      return await apiClient.patch<DepartmentResponseDTO>(`${this.basePath}/${code}`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deactivateDepartment(code: string): Promise<void> {
    try {
      await apiClient.delete(`${this.basePath}/${code}`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getDepartment(code: string): Promise<DepartmentResponseDTO> {
    try {
      return await apiClient.get<DepartmentResponseDTO>(`${this.basePath}/${code}`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllDepartments(params?: FindDepartmentsRequest): Promise<DepartmentResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.q) queryParams.append("q", params.q);
      if (params?.isActive !== undefined) queryParams.append("isActive", params.isActive.toString());
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.size) queryParams.append("size", params.size.toString());

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      return apiClient.get<DepartmentResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const departmentService = new DepartmentService();
