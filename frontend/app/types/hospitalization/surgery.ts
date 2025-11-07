export interface SurgeryPriceResponseDTO {
  id: string;
  name: string;
  hospitalFee: number;
  specialistFee: number;
  surgeryFee: number;
}

export interface CreateSurgeryPriceRequestDTO {
  name: string;
  hospitalFee: number;
  specialistFee: number;
  surgeryFee: number;
}

export interface UpdateSurgeryPriceRequestDTO {
  name?: string;
  hospitalFee?: number;
  specialistFee?: number;
  surgeryFee?: number;
}

export interface SearchSurgeryPricesRequestDTO {
  name?: string;
}
