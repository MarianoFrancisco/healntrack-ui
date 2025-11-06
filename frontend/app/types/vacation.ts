export interface FindAllVacationsRequestDTO {
  employee?: string;
  department?: string;
  startDate?: string;
  endDate?: string;
  requestedAtFrom?: string;
  requestedAtTo?: string;
  status?: string;
}

export interface RequestVacationRequestDTO {
  employeeCui: string;
  requestedAt: string;
  startDate: string;
  endDate: string;
}

export interface ReviewVacationRequestDTO {
  reviewerCui: string;
  reviewedAt: string;
}

export interface VacationResponseDTO {
  id: string;
  employeeCui: string;
  employeeName: string;
  departmentCode: string;
  departmentName: string;
  startDate: string;
  endDate: string;
  requestedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  status: string;
}

export interface ConfigurationResponseDTO {
  key: string;
  value?: number;
}

export interface UpdateConfDTO {
  value: number;
}
