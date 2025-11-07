import type { MedicineStatus } from "./medicine";

export interface CreateSaleItemDTO {
    medicineId: string;
    quantity: number;
    unitPrice: number;
    unitCost?: number;
}

export interface CreateSaleDTO {
    sellerId: string;
    buyerId: string;
    buyerType: string;
    items: CreateSaleItemDTO[];
}

export type SaleStatus = "OPEN" | "COMPLETED";

export interface SaleItemMedicine {
    name: string;
    status: MedicineStatus;
}

export interface SaleItemResponseDTO {
    id: string;
    medicineId: string;
    medicineCode: string;
    quantity: number;
    unitPrice: number;
    unitCost: number;
    lineTotal: number;
    medicine: SaleItemMedicine;
}

export interface SaleSeller {
    cui: string;
    fullname: string;
    isActive: boolean;
}

export interface SaleBuyer {
    cui: string;
    fullname: string;
}

export interface SaleResponseDTO {
    id: string;
    occurredAt: number;
    sellerId: string;
    buyerId: string;
    buyerType: string;
    status: SaleStatus;
    total: number;
    items: SaleItemResponseDTO[];
    seller: SaleSeller;
    buyer: SaleBuyer;
}

export interface SearchSaleRequest {
    occurredFrom?: number;
    occurredTo?: number;
    sellerId?: string;
    status?: SaleStatus | string;
}

export interface CartItem {
    medicineId: string;
    medicineName: string;
    quantity: number;
    unitPrice: number;
    unitCost?: number;
}
