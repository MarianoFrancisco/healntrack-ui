import type { EmployeeResponseDTO } from "../employee";
import type { PatientResponseDTO } from "../patient";
import type { RoomResponseDTO } from "./room";

export interface AddStaffAssignmentRequest {
  employeeId: string;
  assignedAt: string;
}

export interface CreateHospitalizationRequest {
  patientId: string;
  admissionDate: string;
  roomId: string;
}

export interface DischargePatientRequest {
  dischargeDate?: string;
}

export interface RemoveStaffAssignmentRequest {
  employeeId: string;
}

export interface SearchHospitalizationsRequest {
  patientId?: string;
  active?: boolean;
}

export interface StaffAssignmentResponse {
  id: string;
  employeeId: string;
  assignedAt: string;
}

export interface HospitalizationResponse {
  id: string;
  patientId: string;
  roomId: string;
  admissionDate: string;
  dischargeDate?: string;
  totalFee?: number;
  staffAssignment: StaffAssignmentResponse[];
}

export interface StaffAssignmentResponseComplete {
  id: string;
  employee: EmployeeResponseDTO;
  assignedAt: string;
}

export interface HospitalizationResponseComplete {
  id: string;
  patient: PatientResponseDTO;
  room: RoomResponseDTO;
  admissionDate: string;
  dischargeDate?: string;
  totalFee?: number;
  staffAssignment: StaffAssignmentResponseComplete[];
}
