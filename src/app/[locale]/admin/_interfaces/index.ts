import { Role, User } from "@/entities/user";

export interface UsersIds {
  usersIds: string[];
}

export interface UpdateRoles {
  usersIds: string[];
  role: Role;
}
