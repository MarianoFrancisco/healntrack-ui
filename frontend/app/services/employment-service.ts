import type {
  EmployeeResponseDTO,
  FindAllEmployeesRequestDTO,
  PromoteEmployeeRequestDTO,
  RehireEmployeeRequestDTO,
  SalaryIncreaseRequestDTO,
  TerminateEmploymentRequestDTO,
  UpdateEmployeeRequestDTO,
  DepartmentManagerResponseDTO,
  EmploymentResponseDTO,
  FindAllDepartmentManagersRequestDTO,
  FindAllEmploymentsRequestDTO,
  HireEmployeeRequestDTO
} from "~/types/employee";
import { apiClient, ApiError } from "~/lib/api-client";

class EmployeeService {
  private basePath = "/api/v1/employees";

  private async handleError(error: any): Promise<never> {
    console.error("API Error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new Error(error.message || "Error desconocido al procesar la solicitud");
  }

async hireEmployee(request: HireEmployeeRequestDTO): Promise<EmployeeResponseDTO> {
  try {
    return await apiClient.post<EmployeeResponseDTO>(this.basePath, request);
  } catch (error) {
    return this.handleError(error);
  }
}


  async updateEmployee(cui: string, request: UpdateEmployeeRequestDTO): Promise<EmployeeResponseDTO> {
    try {
      return await apiClient.patch<EmployeeResponseDTO>(`${this.basePath}/${cui}`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getEmployee(cui: string): Promise<EmployeeResponseDTO> {
    try {
      return await apiClient.get<EmployeeResponseDTO>(`${this.basePath}/${cui}`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllEmployees(params?: FindAllEmployeesRequestDTO): Promise<EmployeeResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.q) queryParams.append("q", params.q);
      if (params?.department) queryParams.append("department", params.department);
      if (params?.isActive !== undefined) queryParams.append("isActive", params.isActive.toString());

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      return apiClient.get<EmployeeResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async rehireEmployee(cui: string, request: RehireEmployeeRequestDTO): Promise<EmployeeResponseDTO> {
    try {
      return await apiClient.post<EmployeeResponseDTO>(`${this.basePath}/${cui}/rehire`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async promoteEmployee(cui: string, request: PromoteEmployeeRequestDTO): Promise<EmployeeResponseDTO> {
    try {
      return await apiClient.post<EmployeeResponseDTO>(`${this.basePath}/${cui}/promote`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async applySalaryIncrease(cui: string, request: SalaryIncreaseRequestDTO): Promise<EmployeeResponseDTO> {
    try {
      return await apiClient.post<EmployeeResponseDTO>(`${this.basePath}/${cui}/salary-increase`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async terminateEmployment(cui: string, request: TerminateEmploymentRequestDTO): Promise<void> {
    try {
      await apiClient.post(`${this.basePath}/${cui}/terminate`, { data: request });
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllEmployments(params?: FindAllEmploymentsRequestDTO): Promise<EmploymentResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.employee) queryParams.append("employee", params.employee);
      if (params?.department) queryParams.append("department", params.department);
      if (params?.type) queryParams.append("type", params.type);
      if (params?.startDateFrom) queryParams.append("startDateFrom", params.startDateFrom);
      if (params?.startDateTo) queryParams.append("startDateTo", params.startDateTo);
      if (params?.endDateFrom) queryParams.append("endDateFrom", params.endDateFrom);
      if (params?.endDateTo) queryParams.append("endDateTo", params.endDateTo);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}/history?${queryString}` : `${this.basePath}/history`;

      return apiClient.get<EmploymentResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllDepartmentManagers(params?: FindAllDepartmentManagersRequestDTO): Promise<DepartmentManagerResponseDTO[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.employee) queryParams.append("employee", params.employee);
      if (params?.department) queryParams.append("department", params.department);
      if (params?.startDateFrom) queryParams.append("startDateFrom", params.startDateFrom);
      if (params?.startDateTo) queryParams.append("startDateTo", params.startDateTo);
      if (params?.endDateFrom) queryParams.append("endDateFrom", params.endDateFrom);
      if (params?.endDateTo) queryParams.append("endDateTo", params.endDateTo);
      if (params?.isActive !== undefined) queryParams.append("isActive", params.isActive.toString());

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}/managers?${queryString}` : `${this.basePath}/managers`;

      return apiClient.get<DepartmentManagerResponseDTO[]>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const employeeService = new EmployeeService();
