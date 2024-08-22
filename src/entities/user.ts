import { Theme } from "@/types/types";
import { Locale } from "@/types/types";

export type Role = "ADMIN" | "USER" | null;
export type UserPreferences = {
  language: Locale;
  theme: Theme;
};
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  userPreferences: UserPreferences;
}
