export type Role = "ADMIN" | "USER" | null;

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}
