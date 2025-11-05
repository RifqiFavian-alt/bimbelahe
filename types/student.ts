import { Payment } from "./payments";

type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  programs: { id: string; name: string }[];
  payments: Payment[];
  createdAt: string;
  updatedAt: string;
};

export type { Student };
