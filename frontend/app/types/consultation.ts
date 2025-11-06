import type { EmployeeResponseDTO } from "./employee";
import type { PatientResponseDTO } from "./patient";

export interface ConsultationResponseDTO {
  id: string;
  patientId: string;
  employeeId: string;
  date: string;
  reason: string;
  diagnosis: string;
  treatment: string;
  totalFee: number;
}

export interface ConsultationFullData {
  id: string;
  patient: PatientResponseDTO;
  doctor: EmployeeResponseDTO;
  date: string;
  reason: string;
  diagnosis: string;
  treatment: string;
  totalFee: number;
}

export interface CreateConsultationRequestDTO {
  patientId: string;
  employeeId: string;
  date: string;
  reason: string;
  diagnosis: string;
  treatment?: string;
  totalFee: number;
}

export interface SearchConsultationsRequestDTO {
  patientId?: string;
  employeeId?: string;
  dateFrom?: string;
  dateTo?: string;
}
