export interface FindAllPayrollsQuery {
  employee?: string;
  department?: string;
  paydayFrom?: string;
  paydayTo?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
}

export interface PayPayrollRequestDTO {
  startDate: string;
  endDate: string;
  payDay: string;
  type: string;
}

export interface PayrollItemResponseDTO {
  id: string;
  startDate: string;
  endDate: string;
  payDay: string;
  employeeCui: string;
  employeeName: string;
  departmentCode: string;
  departmentName: string;
  grossSalary: number;
  igssDeduction: number;
  irtraDeduction: number;
  netSalary: number;
  notes?: string;
}
