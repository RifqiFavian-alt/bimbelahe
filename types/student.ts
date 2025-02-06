import { Payment } from "./payments";

type Student = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  payments: Payment[];
  createdAt: string;
  updatedAt: string;
};

export type { Student };
