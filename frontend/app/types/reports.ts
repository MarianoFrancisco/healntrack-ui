export interface TransactionResponseDTO {
  id: string;
  area: string;
  concept: string;
  occurredAt: string;
  amount: number;
}

export interface SearchTransactionsRequestDTO {
  area: string;
  startDate: string;
  endDate: string;  
  type: string
}

export interface SearchProfitsRequestDTO {
  area: string;
  startDate: string;
  endDate: string;  
}

export interface ProfitResponseDTO {
  area: string;
  concept: string;
  occurredAt: string; 
  amount: number;     
}
