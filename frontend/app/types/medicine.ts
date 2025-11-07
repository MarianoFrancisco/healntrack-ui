export type MedicineStatus = "ACTIVE" | "INACTIVE";

export type UnitType =
  | "UNIT"
  | "TAB"
  | "CAP"
  | "AMP"
  | "VIAL"
  | "BOTTLE"
  | "BOX";

export interface MedicineResponseDTO {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  status: MedicineStatus;
  unitType: UnitType;
  minStock: number;
  currentPrice: number;
  currentCost: number;
  createdAt: number;
  updatedAt: number;
  stock: number | null;
}

export interface CreateMedicineRequest {
  code: string;
  name: string;
  description?: string | null;
  unitType: UnitType;
  minStock: number;
  currentPrice: number;
  currentCost: number;
}

export interface UpdateMedicineRequest {
  name: string;
  description?: string | null;
  unitType: UnitType;
  minStock: number;
  currentPrice: number;
  currentCost: number;
}

export interface FindMedicinesRequest {
  searchTerm?: string;
  isActive?: boolean;
}
