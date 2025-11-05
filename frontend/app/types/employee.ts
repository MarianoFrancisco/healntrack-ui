import type { DepartmentResponseDTO } from "./department";

export interface HireEmployeeRequestDTO {
  cui: string;
  nit: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  departmentCode: string;
  salary: number;
  igssPercent: number;
  irtraPercent: number;
  startDate: string;
  notes?: string;
}

export interface EmployeeResponseDTO {
  id: string;
  cui: string;
  nit: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  birthDate: string; 
  department: DepartmentResponseDTO;
  salary: number;
  igssPercent: number;
  irtraPercent: number;
  isActive: boolean;
}

export interface FindAllEmployeesRequestDTO {
  q?: string;
  department?: string;
  isActive?: boolean;
}

export interface PromoteEmployeeRequestDTO {
  salaryIncrease: number;
  departmentCode: string;
  date?: string; 
  notes?: string;
}

export interface RehireEmployeeRequestDTO {
  phoneNumber: string;
  departmentCode: string;
  newSalary: number;
  igssPercent: number;
  irtraPercent: number;
  startDate?: string; 
  notes?: string;
}

export interface SalaryIncreaseRequestDTO {
  salaryIncrease: number;
  date?: string; 
  notes?: string;
}

export interface TerminateEmploymentRequestDTO {
  date?: string; 
  terminationType?: string;
  reason?: string;
}

export interface UpdateEmployeeRequestDTO {
  fullname?: string;
  phoneNumber?: string;
  igssPercent?: number;
  irtraPercent?: number;
}

export interface DepartmentManagerResponseDTO {
  id: string;
  departmentCode: string;
  departmentName: string;
  employeeCui: string;
  employeeFullName: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface EmploymentResponseDTO {
  id: string;
  employeeCUi: string;
  employeeFullname: string;
  departmentCode: string;
  departmentName: string;
  type: string;
  startDate: string;
  endDate: string;
  salary: number;
  notes: string;
}

export interface FindAllDepartmentManagersRequestDTO {
  employee?: string;
  department?: string;
  startDateFrom?: string;
  startDateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
  isActive?: boolean;
}

export interface FindAllEmploymentsRequestDTO {
  employee?: string;
  department?: string;
  type?: string;
  startDateFrom?: string;
  startDateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
}
