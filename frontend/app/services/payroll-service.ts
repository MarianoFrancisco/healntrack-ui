import { apiClient, ApiError } from "~/lib/api-client";
import type { FindAllPayrollsQuery, PayPayrollRequestDTO, PayrollItemResponseDTO } from "~/types/payroll";

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

  async getAllPayrolls(params?: FindAllPayrollsQuery): Promise<PayrollItemResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.employee) queryParams.append("employee", params.employee);
      if (params?.department) queryParams.append("department", params.department);
      if (params?.paydayFrom) queryParams.append("paydayFrom", params.paydayFrom);
      if (params?.paydayTo) queryParams.append("paydayTo", params.paydayTo);
      if (params?.startDate) queryParams.append("startDate", params.startDate);
      if (params?.endDate) queryParams.append("endDate", params.endDate);
      if (params?.type) queryParams.append("type", params.type);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      return apiClient.get<PayrollItemResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const payrollService = new PayrollService();
