export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

type User = {
  id: string;
  name: string;
  email: string;
  password: string; // Sebaiknya password di-hash dan tidak dikirimkan ke client
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type { User };
