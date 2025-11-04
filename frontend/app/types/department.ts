export interface DepartmentResponseDTO {
  code: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface CreateDepartmentRequest {
  name: string;
  code: string;
  description?: string;
}

export interface UpdateDepartmentRequest {
  code: string;
  name?: string;
  description?: string;
}

export interface FindDepartmentsRequest {
  q?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
}
