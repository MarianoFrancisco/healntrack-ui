import { apiClient, ApiError } from "~/lib/api-client";
import type { PayPayrollRequestDTO, PayrollItemResponseDTO } from "~/types/payroll";

class PayrollService {
  private basePath = "/api/v1/employees/payrolls";

  private async handleError(error: any): Promise<never> {
    console.error("API Error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new Error(error.message || "Error desconocido al procesar la solicitud");
  }

  async payPayroll(request: PayPayrollRequestDTO): Promise<PayrollItemResponseDTO> {
    try {
      return await apiClient.post<PayrollItemResponseDTO>(this.basePath, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllPayrolls(params?: Record<string, any>): Promise<PayrollItemResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            queryParams.append(key, String(value));
          }
        });
      }

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      return apiClient.get<PayrollItemResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const payrollService = new PayrollService();
