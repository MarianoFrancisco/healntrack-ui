
export interface FindBatchesRequestDTO {
  medicineCode?: string;
  onlyWithStock?: boolean;
  onlyNotExpired?: boolean;
}


export interface CreateBatchRequestDTO {
  medicineCode: string;
  expirationDate: string; 
  purchasedQuantity: number;
  purchasedBy: string; 
}


export interface BatchResponseDTO {
  id: string;
  medicineId: string;
  expirationDate: string;
  purchasedQuantity: number;
  quantityOnHand: number;
  purchasePrice: string; 
  purchasedBy: string;
  createdAt: number;
  updatedAt: number;
  medicine: BatchMedicineDTO;
  employee: BatchEmployeeDTO;
}


export interface BatchMedicineDTO {
  code: string;
  name: string;
  status: string;
}


export interface BatchEmployeeDTO {
  cui: string;
  fullname: string;
  isActive: boolean;
}
