import { apiClient, ApiError } from "~/lib/api-client";
import type {
  AddStaffAssignmentRequest,
  CreateHospitalizationRequest,
  DischargePatientRequest,
  HospitalizationResponse,
  HospitalizationResponseComplete,
  RemoveStaffAssignmentRequest,
  SearchHospitalizationsRequest,
  StaffAssignmentResponse,
  StaffAssignmentResponseComplete,
} from "~/types/hospitalization/hospitalization";

import { patientService } from "~/services/patient-service";
import { roomService } from "./room-service";
import { employeeService } from "../employment-service";
import type { RoomStatus } from "~/types/hospitalization/room";

class HospitalizationService {
  private basePath = "/api/v1/hospitalizations";

  private async handleError(error: any): Promise<never> {
    console.error("API Error:", error);
    if (error instanceof ApiError) throw error;
    throw new Error(error.message || "Error desconocido al procesar la solicitud");
  }
  async createHospitalization(
    request: CreateHospitalizationRequest
  ): Promise<HospitalizationResponse> {
    try {
      return await apiClient.post<HospitalizationResponse>(this.basePath, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async dischargePatient(
    id: string,
    request: DischargePatientRequest
  ): Promise<void> {
    try {
      await apiClient.post(`${this.basePath}/${id}/discharge`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addStaffAssignment(
    id: string,
    request: AddStaffAssignmentRequest
  ): Promise<void> {
    try {
      await apiClient.post(`${this.basePath}/${id}/add-staff`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async removeStaffAssignment(
    id: string,
    request: RemoveStaffAssignmentRequest
  ): Promise<void> {
    try {
      await apiClient.post(`${this.basePath}/${id}/remove-staff`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllHospitalizations(
    params?: SearchHospitalizationsRequest
  ): Promise<HospitalizationResponseComplete[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.patientId) queryParams.append("patientId", params.patientId);
      if (params?.active !== undefined)
        queryParams.append("active", params.active.toString());

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      const hospitalizations = await apiClient.get<HospitalizationResponse[]>(endpoint);

      const [patients, rooms, employees] = await Promise.all([
        patientService.getAllPatients(),
        roomService.getAllRooms(),
        employeeService.getAllEmployees(),
      ]);

      const completeList: HospitalizationResponseComplete[] = hospitalizations.map(
        (h) => {
          const patient = patients.find((p) => p.id === h.patientId)!;
          const room = rooms.find((r) => r.id === h.roomId)!;

          const staffAssignment: StaffAssignmentResponseComplete[] =
            h.staffAssignment.map((s: StaffAssignmentResponse) => {
              const employee = employees.find((e) => e.id === s.employeeId)!;
              return {
                id: s.id,
                employee,
                assignedAt: s.assignedAt,
              };
            });

          return {
            id: h.id,
            patient,
            room,
            admissionDate: h.admissionDate,
            dischargeDate: h.dischargeDate,
            totalFee: h.totalFee,
            staffAssignment,
          };
        }
      );

      return completeList;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getHospitalizationById(id: string): Promise<HospitalizationResponseComplete> {
    try {
      const h = await apiClient.get<HospitalizationResponse>(`${this.basePath}/${id}`);

    //   const [patient, room, employees] = await Promise.all([
        const [patient, employees] = await Promise.all([
        patientService.getPatient(h.patientId),
        // roomService.getRoom(h.roomId),
        employeeService.getAllEmployees(),
      ]);
    //   TEMPORAL NERY SAPO
      const room = {id: h.roomId, number: "N/A", status: "OCCUPIED" as RoomStatus, costPerDay: 0, maintenanceCost: 0}; // Placeholder until roomService is fixed

      const staffAssignment: StaffAssignmentResponseComplete[] = h.staffAssignment.map(
        (s: StaffAssignmentResponse) => {
          const employee = employees.find((e) => e.id === s.employeeId)!;
          return {
            id: s.id,
            employee,
            assignedAt: s.assignedAt,
          };
        }
      );

      return {
        id: h.id,
        patient,
        room,
        admissionDate: h.admissionDate,
        dischargeDate: h.dischargeDate,
        totalFee: h.totalFee,
        staffAssignment,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const hospitalizationService = new HospitalizationService();
