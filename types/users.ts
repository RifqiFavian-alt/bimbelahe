export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type UserDetail = User & {
  password: string;
};

export type { User, UserDetail };
