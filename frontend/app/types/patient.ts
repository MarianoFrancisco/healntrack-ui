export interface CreatePatientRequestDTO {
  cui: string;
  fullName: string;
  birthDate: string;
  gender: string;
  address: string;
  email: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
}

export interface PatientResponseDTO {
  id: string;
  cui: string;
  fullName: string;
  birthDate: string;
  gender: string;
  address: string;
  email: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
}

export interface SearchPatientsRequestDTO {
  q?: string;
  gender?: string;
}

export interface UpdatePatientRequestDTO {
  fullName?: string;
  gender?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  emergencyPhoneNumber?: string;
}
