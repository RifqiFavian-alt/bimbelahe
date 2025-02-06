type PaymentFilters = {
  studentId?: string;
  month?: number;
  year?: number;
};

type Payment = {
  id: string;
  studentId?: string | null;
  month: number;
  year: number;
  isPaid: boolean;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type { PaymentFilters, Payment };
