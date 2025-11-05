type Payment = {
  id: string;
  studentId?: string | null;
  month: number;
  year: number;
  isPaid: boolean;
  updatedAt: Date;
  studentName: string | null;
};

type PaymentTable = Pick<Payment, "id" | "isPaid" | "studentName" | "month" | "year">;

type PaymentRetrieve = {
  payments: Payment[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPayments: number;
  };
};
export type { Payment, PaymentRetrieve, PaymentTable };
